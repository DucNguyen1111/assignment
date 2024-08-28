import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { UploadFileServiceAbstract } from '../../service/files/upload-file.abstract.service';
import { UploadFileServiceS3 } from '../../service/files/upload-file.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from '../../service/amqp/rabbitmq.service';

@Module({
  imports: [],
  controllers: [ImageController],
  providers: [
    RabbitMQService,
    ImageService,
    {
      provide: UploadFileServiceAbstract,
      useClass: UploadFileServiceS3,
    },
    {
      provide: 'IMAGE_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get('RABBITMQ_USER');
        const PASSWORD = configService.get('RABBITMQ_PASS');
        const HOST = configService.get('RABBITMQ_HOST');
        const QUEUE = configService.get('RABBITMQ_IMAGE_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ImageModule {}

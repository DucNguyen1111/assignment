import { Injectable } from '@nestjs/common';
import { UploadFileServiceAbstract } from '../../service/files/upload-file.abstract.service';
import { PrismaService } from '../../_core/global/prisma/prisma.service';
import { FindAllImageFilterDto } from './dto/find-all-image.dto';
import { RabbitMQService } from '../../service/amqp/rabbitmq.service';
import { ImageDataResponse } from '../../_core/types';
import { RedisCacheService } from '../../_core/global/redis/redis.service';

@Injectable()
export class ImageService {
  constructor(
    private rabbitMQService: RabbitMQService,
    private readonly uploadFileService: UploadFileServiceAbstract,
    private readonly prisma: PrismaService,
    private redis: RedisCacheService,
  ) {}

  async create(file: Express.Multer.File) {
    const { key, url, bucketName } =
      await this.uploadFileService.uploadFileToPublicBucket('image', {
        file,
        fileName: file.originalname,
      });

    const image = await this.prisma.image.create({
      data: {
        key,
        url,
      },
    });

    await this.rabbitMQService.publishMessage({
      id: image.id,
      s3_bucket: bucketName,
      s3_key: key,
    });

    return image;
  }

  async findAll(filter: FindAllImageFilterDto) {
    let images: ImageDataResponse[] = [];
    if (filter.content) {
      const key = filter.content;
      const imageCacheData = await this.redis.get(key);
      if (imageCacheData) return imageCacheData;

      images = await this.prisma.image.findMany({
        select: {
          id: true,
          url: true,
          createdAt: true,
          updatedAt: true,
          isAnalyzed: true,
        },
        where: {
          content: {
            contains: filter.content,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      await this.redis.set(key, images);
    } else {
      images = await this.prisma.image.findMany({
        select: {
          id: true,
          url: true,
          createdAt: true,
          updatedAt: true,
          isAnalyzed: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    return images;
  }

  async findOne(id: number) {
    const image = await this.prisma.image.findFirstOrThrow({
      select: {
        id: true,
        url: true,
        createdAt: true,
        updatedAt: true,
        isAnalyzed: true,
      },
      where: {
        id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return image;
  }

  async update(id: number, content: string) {
    return await this.prisma.image.update({
      data: {
        isAnalyzed: true,
        content,
      },
      where: {
        id,
      },
    });
  }
}

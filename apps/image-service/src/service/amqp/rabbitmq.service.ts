import * as amqp from 'amqplib';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService {
  constructor(private readonly configService: ConfigService) {}

  async publishMessage(message: {
    id: number;
    s3_key: string;
    s3_bucket: string;
  }) {
    try {
      const USER = this.configService.get('RABBITMQ_USER');
      const PASSWORD = this.configService.get('RABBITMQ_PASS');
      const HOST = this.configService.get('RABBITMQ_HOST');
      const QUEUE = this.configService.get('RABBITMQ_IMAGE_QUEUE');
      // Connect to RabbitMQ server
      const connection = await amqp.connect(
        `amqp://${USER}:${PASSWORD}@${HOST}`
      );

      // Create a channel
      const channel = await connection.createChannel();

      // Declare a queue
      const queue = QUEUE;
      await channel.assertQueue(queue, {
        durable: true,
      });

      // Convert JSON object to string
      const messageString = JSON.stringify(message);

      // Send the JSON string to the queue
      channel.sendToQueue(queue, Buffer.from(messageString));
      console.log(`Sent: ${messageString}`);

      // Close the connection and exit
      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

import { Module } from '@nestjs/common';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../_helper/http-exception.filter';
import { PrismaModule } from '../_core/global/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ImageModule } from '../modules/image/image.module';
import { ResponseInterceptor } from '../_core/interceptor';
import { RedisCacheModule } from '../_core/global/redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    RedisCacheModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    ImageModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

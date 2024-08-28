import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import {
  FindAllImageFilterDto,
  FindAllImageFilterParams,
} from './dto/find-all-image.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @MessagePattern('analyzed-image')
  async update(
    @Payload() data: { id: number; content: string },
    @Ctx() context: RmqContext
  ) {
    const { id, content } = data;
    const chanel = context.getChannelRef();
    const message = context.getMessage();
    await this.imageService.update(id, content);
    chanel.ack(message);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.create(file);
  }

  @Get()
  findAll(@FindAllImageFilterParams() filter: FindAllImageFilterDto) {
    return this.imageService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }
}

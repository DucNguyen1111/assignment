import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { Request } from 'express';

export class FindAllImageFilterDto {
  @IsString()
  @IsOptional()
  content?: string;
}

export const FindAllImageFilterParams = createParamDecorator(
  (_, ctx: ExecutionContext): FindAllImageFilterDto => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter: FindAllImageFilterDto = {};
    if (req.query.content) filter.content = req.query.content as string;
    return filter;
  }
);

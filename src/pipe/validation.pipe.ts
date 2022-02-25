import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    /** metadata
     *  metatype: 파라미터의 타입
     * type: 파라미터가  Body, Param,Query, Custom인지
     * data: 파라미터의 이름
     */
    return value;
  }
}

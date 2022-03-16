import { HttpExceptionFilter } from './http-exception.filter';
import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class ExceptionModule {}

import { TransformInterceptor } from './interceptor/transform.interceptor';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { AppModule } from './app.module';
import { AuthGuard } from './guard/authGuard';
import * as winston from 'winston';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(logger3);
  //로거 전역사용
  // app.useLogger(app.get(MyLogger))
  // winston logger
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );
  await app.listen(3000);
}
bootstrap();

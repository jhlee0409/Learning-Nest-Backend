import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guard/authGuard';
import { logger3 } from './logger/logger3.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'verbose', 'debug'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(logger3);
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();

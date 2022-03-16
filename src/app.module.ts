import { RolesGuard } from './guard/RolesGuard';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './loggerMiddleware/logger.middleware';
import { Logger2Middleware } from './loggerMiddleware/logger2.middleware';
import { UsersController } from './users/users.controller';
import authConfig from './config/authConfig';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      //! synchronize = true 면 서비스 실행 -> DB연결시 -> 항상 DB 초기화
      //! Production에서는 절대 사용 금지
      // synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply()
      // .exclude({ path: 'users', method: RequestMethod.GET })
      .forRoutes(UsersController);
  }
}

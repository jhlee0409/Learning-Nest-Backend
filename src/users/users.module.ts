import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from './../email/email.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Logger, Module } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [EmailModule, AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [Logger, UsersService],
  exports: [UsersModule, UsersService],
})
export class UsersModule {}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/email-verify.dto';
import { UserLoginDTo } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDTo): Promise<string> {
    const { email, password } = dto;
    return await this.userService.login(email, password);
  }

  @Get('/:id')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: string,
  ): Promise<UserInfo> {
    return await this.userService.getUserInfo(userId);
  }
  @Get()
  findAll(
    @Query('offset', ValidationPipe) offset: string,
    @Query('limit', new DefaultValuePipe('missed limit')) limit: number,
  ) {
    console.log(offset, limit);

    return;
  }
}

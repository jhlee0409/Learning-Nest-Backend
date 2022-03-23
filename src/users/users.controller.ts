import { ErrorInterceptor } from './../interceptor/error.interceptor';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Inject,
  LoggerService,
  InternalServerErrorException,
  Logger,
  UseInterceptors,
} from '@nestjs/common';
import { UserData } from 'src/decorator/UserData';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/email-verify.dto';
import { UserLoginDTo } from './dto/user-login.dto';
import { UserInfo } from './UserInfo';
import { UsersService } from './users.service';
import { Roles } from 'src/decorator/Roles';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
@Roles('user')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    private userService: UsersService,
  ) {}
  @Post()
  @Roles('admin')
  async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    this.printLoggerServiceLog(dto);
    // await this.userService.createUser(name, email, password);
  }

  @Get('/username')
  @Roles('admin')
  getHello2(@UserData('name') name: string) {
    console.log(name);
  }

  private printLoggerServiceLog(dto) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error: ', JSON.stringify(dto), e.stack);
    }
    this.logger.warn('warn: ', JSON.stringify(dto));
    this.logger.log('log: ', JSON.stringify(dto));
    this.logger.verbose('verbose: ', JSON.stringify(dto));
    this.logger.debug('debug: ', JSON.stringify(dto));
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
  @UseInterceptors(ErrorInterceptor)
  @Get('/:id')
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: string,
  ): Promise<UserInfo> {
    throw new InternalServerErrorException();
    // return await this.userService.getUserInfo(userId);
  }
  @Get()
  @Roles('admin')
  findAll(
    @Query('offset', ValidationPipe) offset: string,
    @Query('limit', new DefaultValuePipe('missed limit')) limit: number,
  ) {
    console.log(offset, limit);
    return;
  }
}

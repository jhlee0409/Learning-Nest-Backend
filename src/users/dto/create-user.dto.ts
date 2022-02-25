import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}

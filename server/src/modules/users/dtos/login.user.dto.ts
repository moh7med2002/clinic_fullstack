import { IsEmail, Length, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @Length(3, 10)
  @IsString()
  password: string;
}

import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserChangeEmailDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}

import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

export class ChangeEmailAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class ChangePasswordAdminDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @Length(3, 10)
  @IsString()
  newPassword: string;
}

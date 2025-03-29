import { Length, IsString } from 'class-validator';

export class UserChangePasswordDto {
  @IsString()
  oldPassword: string;

  @Length(3, 10)
  @IsString()
  newPassword: string;
}

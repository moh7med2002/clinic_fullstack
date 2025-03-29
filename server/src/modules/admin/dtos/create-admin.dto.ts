import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(3, 10)
  @IsString()
  password: string;
}

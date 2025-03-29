import {
  IsEmail,
  IsOptional,
  Length,
  IsString,
  IsEnum,
  IsDateString,
  IsInt,
  Min,
  IsPhoneNumber,
} from 'class-validator';
import { Gender, UserRoleStatus } from 'src/constants/enum';

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @Length(3, 10)
  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsPhoneNumber(null)
  @IsString()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  birthdate: string;

  @IsEnum(UserRoleStatus)
  role: UserRoleStatus;

  @IsOptional()
  @IsString()
  departmentId?: string; // Optional when updating the user
}

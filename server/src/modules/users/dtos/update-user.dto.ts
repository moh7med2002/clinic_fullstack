import {
  IsPhoneNumber,
  IsEnum,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Gender } from 'src/constants/enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsPhoneNumber(null)
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsDateString()
  birthdate: string;
}

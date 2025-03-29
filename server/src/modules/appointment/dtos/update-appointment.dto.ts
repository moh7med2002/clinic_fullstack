import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { AppointmentStatus } from 'src/constants/enum';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

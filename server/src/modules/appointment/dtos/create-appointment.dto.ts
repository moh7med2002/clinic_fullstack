import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { AppointmentStatus } from 'src/constants/enum';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  note: string;

  //   @IsNotEmpty()
  //   @IsEnum(AppointmentStatus)
  //   status: AppointmentStatus;

  @IsNotEmpty()
  patientId: number | string;

  @IsNotEmpty()
  doctorId: number | string;
}

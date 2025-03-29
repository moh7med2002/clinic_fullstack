import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { paymentStatus } from 'src/constants/enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  patientId: number | string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsEnum(paymentStatus)
  status: paymentStatus;

  @IsNotEmpty()
  @IsInt()
  fee: number; // Added fee field
}

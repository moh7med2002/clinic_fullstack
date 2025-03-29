import { IsEnum, IsInt, IsOptional, IsNumber, IsString } from 'class-validator';
import { paymentStatus } from 'src/constants/enum';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsEnum(paymentStatus)
  status?: paymentStatus;

  @IsOptional()
  @IsInt()
  fee?: number; // Added fee field
}

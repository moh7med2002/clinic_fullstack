import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/users/dtos/user.dto';

export class PaymentDto {
  @Expose()
  id: string;

  @Expose()
  note: string;

  @Expose()
  fee: number;

  @Expose()
  status: string;

  @Expose()
  createdAt: string;

  @Expose()
  @Type(() => UserDto)
  patient: UserDto;
}

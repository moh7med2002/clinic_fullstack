import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/users/dtos/user.dto';

export class AppointmentDto {
  @Expose()
  id: string;

  @Expose()
  note: string;

  @Expose()
  date: string;

  @Expose()
  status: string;

  @Expose()
  @Type(() => UserDto)
  doctor: UserDto;

  @Expose()
  @Type(() => UserDto)
  patient: UserDto;
}

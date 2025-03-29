import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/users/dtos/user.dto';

export class DepartmentDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => UserDto)
  users: UserDto[];
}

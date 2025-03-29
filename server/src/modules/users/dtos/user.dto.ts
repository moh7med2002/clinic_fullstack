import { Expose, Type } from 'class-transformer';
import { DepartmentDto } from 'src/modules/department/dtos/department.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  image: string;

  @Expose()
  phone: string;

  @Expose()
  name: string;

  @Expose()
  gender: string;

  @Expose()
  birthdate: string;

  @Expose()
  role: string;

  @Expose()
  @Type(() => DepartmentDto)
  department: DepartmentDto;
}

export class AuthUserResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}

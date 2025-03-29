import { Expose, Type } from 'class-transformer';

export class AdminDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

export class AuthAdminResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  @Type(() => AdminDto) // Ensures AdminDto serialization is applied
  admin: AdminDto;
}

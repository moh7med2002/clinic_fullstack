import { SetMetadata } from '@nestjs/common';
import { UserRoleStatus } from 'src/constants/enum';

export const Roles = (...roles: UserRoleStatus[]) =>
  SetMetadata('roles', roles);

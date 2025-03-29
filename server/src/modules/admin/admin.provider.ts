import { adminRepositry } from 'src/constants/entityRepositry';
import { Admin } from './admin.entity';

export const adminProviders = [
  {
    provide: adminRepositry,
    useValue: Admin,
  },
];

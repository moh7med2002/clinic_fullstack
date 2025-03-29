import { userRepositry } from 'src/constants/entityRepositry';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: userRepositry,
    useValue: User,
  },
];

import { departmentRepositry } from 'src/constants/entityRepositry';
import { Department } from './department.entity';

export const departmentProviders = [
  {
    provide: departmentRepositry,
    useValue: Department,
  },
];

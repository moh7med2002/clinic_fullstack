import { paymentRepositry } from 'src/constants/entityRepositry';
import { Payment } from './payment.entity';

export const paymentProviders = [
  {
    provide: paymentRepositry,
    useValue: Payment,
  },
];

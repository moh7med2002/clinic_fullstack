import { appointmentRepositry } from 'src/constants/entityRepositry';
import { Appointment } from './appointment.entity';

export const appointmentProviders = [
  {
    provide: appointmentRepositry,
    useValue: Appointment,
  },
];

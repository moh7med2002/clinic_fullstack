import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { appointmentProviders } from './appointment.provider';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, ...appointmentProviders],
  exports: [AppointmentService],
})
export class AppointmentModule {}

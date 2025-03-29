import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { AppointmentModule } from '../appointment/appointment.module';
import { PaymentModule } from '../payment/payment.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [AppointmentModule, PaymentModule, UsersModule],
})
export class StatisticsModule {}

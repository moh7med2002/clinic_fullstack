import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { DepartmentModule } from './modules/department/department.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { PaymentModule } from './modules/payment/payment.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    DepartmentModule,
    AdminModule,
    AppointmentModule,
    PaymentModule,
    StatisticsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '2h' },
    }),
  ],
})
export class AppModule {}

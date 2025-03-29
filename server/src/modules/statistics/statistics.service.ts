import { Injectable } from '@nestjs/common';
import { AppointmentService } from '../appointment/appointment.service';
import { PaymentService } from '../payment/payment.service';
import { UsersService } from '../users/users.service';
import { UserRoleStatus } from 'src/constants/enum';

export interface MonthlyData {
  month: string;
  appointmentCount: number;
  revenue: number;
}

@Injectable()
export class StatisticsService {
  constructor(
    private readonly appointmentsService: AppointmentService,
    private readonly paymentService: PaymentService,
    private readonly userService: UsersService,
  ) {}

  async findMonthlyStatisicts() {
    const [appointments, revenue] = await Promise.all([
      this.appointmentsService.getMonthlyAppointments(),
      this.paymentService.getMontlyPayments(),
    ]);

    const monthlyStats = (
      appointments as unknown as Array<{
        month: number;
        appointmentsCount: number;
      }>
    ).map((appointment) => {
      const month = appointment.month;
      const revenueForMonth = (
        revenue as unknown as Array<{ month: number; totalRevenue: number }>
      ).find((payment) => payment.month === month);

      return {
        month,
        appointmentsCount: appointment.appointmentsCount,
        revenue: revenueForMonth ? revenueForMonth.totalRevenue : 0, // If no revenue, default to 0
      };
    });

    return monthlyStats;
  }

  async fetchStatistics() {
    const [doctors, patients, appointments, payments] = await Promise.all([
      this.userService.countUsers(UserRoleStatus.DOCTOR),
      this.userService.countUsers(UserRoleStatus.PATIENT),
      this.appointmentsService.countAppointmnets(),
      this.paymentService.sumPayments(),
    ]);
    return { doctors, patients, appointments, payments };
  }
}

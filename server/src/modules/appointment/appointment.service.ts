import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { appointmentRepositry } from 'src/constants/entityRepositry';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UsersService } from '../users/users.service';
import { UserRoleStatus } from 'src/constants/enum';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { User } from '../users/user.entity';
import { Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject(appointmentRepositry) private appointmentRepo: typeof Appointment,
    private readonly usersService: UsersService,
  ) {}

  async createAppointment(dto: CreateAppointmentDto) {
    const [patient, doctor] = await Promise.all([
      this.usersService.findWithRole(+dto.patientId, UserRoleStatus.PATIENT),
      this.usersService.findWithRole(+dto.doctorId, UserRoleStatus.DOCTOR),
    ]);
    if (!patient || !doctor) {
      throw new BadRequestException('Inalid doctor and patient');
    }
    return this.appointmentRepo.create({ ...dto });
  }

  async updateAppointment(id: number, dto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    Object.assign(appointment, dto);
    return appointment.save();
  }

  async findOne(id: number) {
    const appointment = this.appointmentRepo.findByPk(id);
    if (!appointment) {
      throw new BadRequestException('Invalid appointment');
    }
    return appointment;
  }

  async fetchAll() {
    return this.appointmentRepo.findAll({
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async fetchUserAppointments(userId: number) {
    return this.appointmentRepo.findAll({
      where: {
        [Op.or]: [{ doctorId: userId }, { patientId: userId }],
      },
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'name'],
        },
      ],
    });
  }

  async dailyAppointments() {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    );
    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );

    return this.appointmentRepo.findAll({
      where: {
        date: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
      include: [
        {
          model: User,
          as: 'patient',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'doctor',
          attributes: ['id', 'name'],
        },
      ],
      order: [['date', 'ASC']], // Sort by date in ascending order
    });
  }

  // Fetch appointments in the last 12 months
  async getMonthlyAppointments() {
    const appointmentsByMonth = await this.appointmentRepo.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('date')), 'month'], // Group by month
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'appointmentsCount'], // Count appointments
      ],
      group: [Sequelize.fn('MONTH', Sequelize.col('date'))], // Group by the month of the date
      order: [[Sequelize.fn('MONTH', Sequelize.col('date')), 'ASC']], // Order by month
      raw: true,
    });
    return appointmentsByMonth;
  }

  async countAppointmnets() {
    return this.appointmentRepo.count();
  }
}

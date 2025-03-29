import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { paymentRepositry } from 'src/constants/entityRepositry';
import { Payment } from './payment.entity';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { User } from '../users/user.entity';
import { Op, Sequelize } from 'sequelize';
import { paymentStatus } from 'src/constants/enum';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(paymentRepositry)
    private paymentRepository: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.create({ ...createPaymentDto });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findByPk(id);
    if (!payment) {
      throw new BadRequestException('Payment not found');
    }
    Object.assign(payment, updatePaymentDto);
    return payment.save();
  }

  async findAll() {
    return this.paymentRepository.findAll({
      include: [{ model: User, attributes: ['id', 'name'] }],
    });
  }

  async findLates() {
    return this.paymentRepository.findAll({
      include: [{ model: User, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']], // Sort by latest created records
      limit: 10, // Fetch only the latest 10 records
    });
  }

  async findUserTrasnactions(userId: number) {
    return this.paymentRepository.findAll({
      where: { patientId: userId },
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new BadRequestException('This transaction not found');
    }
    return payment;
  }

  async deleteOne(id: number) {
    return this.paymentRepository.destroy({ where: { id } });
  }

  // Fetch payments in the last 12 months
  async getMontlyPayments() {
    const revenueByMonth = await this.paymentRepository.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'], // Group by month
        [Sequelize.fn('SUM', Sequelize.col('fee')), 'totalRevenue'], // Sum the fees for revenue
      ],
      group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))], // Group by month of payment
      order: [[Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'ASC']], // Order by month
      raw: true,
    });
    return revenueByMonth;
  }

  async sumPayments() {
    const result = await this.paymentRepository.findAll({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('fee')), 'totalRevenue']],
      raw: true, // Ensures a plain object is returned
    });
    return (
      (result[0] as unknown as { totalRevenue: number })?.totalRevenue || 0
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PaymentDto } from './dtos/payment.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Serialize(PaymentDto)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AdminGuard)
  @Post('')
  create(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  update(@Body() body: UpdatePaymentDto, @Param('id') id: string) {
    return this.paymentService.update(parseInt(id), body);
  }

  @Get('/latest')
  getLatest() {
    return this.paymentService.findLates();
  }

  @Get()
  getAll() {
    return this.paymentService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  getUserAppointments(@CurrentUser() user: User) {
    return this.paymentService.findUserTrasnactions(user.id);
  }

  @UseGuards(AdminGuard)
  @Get('/user/:id')
  getUserAppointmentsByAdmin(@Param('id') userId: string) {
    return this.paymentService.findUserTrasnactions(+userId);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.paymentService.deleteOne(+id);
  }
}

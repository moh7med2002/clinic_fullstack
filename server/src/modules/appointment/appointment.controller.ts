import {
  Body,
  Controller,
  Post,
  UseGuards,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AppointmentDto } from './dtos/appointment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Serialize(AppointmentDto)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AdminGuard)
  @Post('create')
  create(@Body() body: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(body);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  update(@Body() body: UpdateAppointmentDto, @Param('id') id: string) {
    return this.appointmentService.updateAppointment(parseInt(id), body);
  }

  @Get()
  getAll() {
    return this.appointmentService.fetchAll();
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  getUserAppointments(@CurrentUser() user: User) {
    console.log(user);
    return this.appointmentService.fetchUserAppointments(user.id);
  }

  @UseGuards(AdminGuard)
  @Get('/user/:id')
  getUserAppointmentsByAdmin(@Param('id') userId: string) {
    return this.appointmentService.fetchUserAppointments(+userId);
  }

  @Get('/daily')
  getDailyAppointments() {
    return this.appointmentService.dailyAppointments();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }
}

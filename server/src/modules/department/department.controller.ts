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
import { DepartmentService } from './department.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DepartmentDto } from './dtos/department.dto';

@Controller('department')
@Serialize(DepartmentDto)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() body: CreateDepartmentDto) {
    return this.departmentService.createDepartment(body);
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  update(@Body() body: CreateDepartmentDto, @Param('id') depId: string) {
    return this.departmentService.updateDepartment(body, +depId);
  }

  @Get()
  fetchAll() {
    return this.departmentService.findAll();
  }

  @Get('/:id')
  fetchOne(@Param('id') id: string) {
    return this.departmentService.findById(+id);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.departmentService.deleteDepartment(+id);
  }
}

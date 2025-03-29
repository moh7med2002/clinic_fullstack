import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { departmentRepositry } from 'src/constants/entityRepositry';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { Op } from 'sequelize';
import { User } from '../users/user.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(departmentRepositry) private departmentRepo: typeof Department,
  ) {}

  async createDepartment(dto: CreateDepartmentDto) {
    const departmentWithName = await this.findOne(dto.name);
    if (departmentWithName) {
      throw new BadRequestException('Department name aleready used');
    }
    const newDepartment = await this.departmentRepo.create({ ...dto });
    return newDepartment;
  }

  async updateDepartment(dto: CreateDepartmentDto, id: number) {
    const [departmentById, departmentWithName] = await Promise.all([
      this.departmentRepo.findByPk(id),
      this.departmentRepo.findOne({
        where: { name: dto.name, id: { [Op.not]: id } },
      }),
    ]);
    if (!departmentById) {
      throw new BadRequestException('Invalid department');
    }
    if (departmentWithName) {
      throw new BadRequestException('Department name already used');
    }
    Object.assign(departmentById, dto);
    return departmentById.save();
  }

  async findAll() {
    return this.departmentRepo.findAll({
      include: [{ model: User }],
    });
  }

  async findOne(name: string) {
    return this.departmentRepo.findOne({ where: { name } });
  }

  async findById(id: number) {
    const department = await this.departmentRepo.findByPk(id);
    if (!department) {
      throw new BadRequestException('Department not found');
    }
    return department;
  }

  async findByIdToCreateUser(id: number) {
    const department = await this.departmentRepo.findByPk(id);
    return department;
  }

  async deleteDepartment(id: number) {
    return this.departmentRepo.destroy({ where: { id } });
  }
}

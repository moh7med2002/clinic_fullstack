import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { adminRepositry } from 'src/constants/entityRepositry';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { hashPassword, VerifyPassword } from 'src/common/util/password.util';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import {
  ChangeEmailAdminDto,
  ChangePasswordAdminDto,
} from './dtos/change-email-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @Inject(adminRepositry)
    private adminRepo: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateAdminDto) {
    const adminsNumber = await this.adminRepo.count();
    if (adminsNumber > 0) {
      throw new BadRequestException(
        'An admin already exists. You cannot create a new one.',
      );
    }
    const hashedPassword = await hashPassword(dto.password);
    const newAdmin = await this.adminRepo.create({
      ...dto,
      password: hashedPassword,
    });
    return newAdmin;
  }

  async login(dto: CreateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { email: dto.email } });
    if (!admin) {
      throw new BadRequestException('Invalid Email');
    }
    const isMatchPassowrd = await VerifyPassword(dto.password, admin.password);
    if (!isMatchPassowrd) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { adminId: admin.id, role: 'admin' };
    return { admin, access_token: await this.jwtService.signAsync(payload) };
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findByPk(id);
    if (!admin) {
      throw new BadRequestException('Invalid Admin');
    }
    return admin;
  }

  async getAdmin() {
    const admin = await this.adminRepo.findAll();
    if (admin.length === 0) {
      throw new BadRequestException('Get admin falied');
    }
    return admin[0];
  }

  async changeEmail(dto: ChangeEmailAdminDto) {
    const admin = await this.getAdmin();
    admin.email = dto.email;
    await admin.save();
    return admin;
  }

  async updatePassword(dto: ChangePasswordAdminDto) {
    const admin = await this.getAdmin();
    const isMatchPassowrd = await VerifyPassword(
      dto.oldPassword,
      admin.password,
    );
    if (!isMatchPassowrd) {
      throw new BadRequestException('Invalid Old Password');
    }
    const hashedPassword = await hashPassword(dto.newPassword);
    admin.password = hashedPassword;
    await admin.save();
    return admin;
  }
}

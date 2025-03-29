import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AdminDto, AuthAdminResponseDto } from './dtos/admin.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  ChangeEmailAdminDto,
  ChangePasswordAdminDto,
} from './dtos/change-email-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  @Serialize(AdminDto)
  create(@Body() body: CreateAdminDto) {
    return this.adminService.signup(body);
  }

  @Post('signin')
  @Serialize(AuthAdminResponseDto)
  async login(@Body() body: CreateAdminDto) {
    const { admin, access_token } = await this.adminService.login(body);
    return { admin, access_token };
  }

  @Post('signout')
  logout(@Session() session: any) {
    session.adminId = null;
  }

  @UseGuards(AdminGuard)
  @Serialize(AdminDto)
  @Get()
  getAdmin() {
    return this.adminService.getAdmin();
  }

  @UseGuards(AdminGuard)
  @Serialize(AdminDto)
  @Patch('/change-email')
  changeEmail(@Body() body: ChangeEmailAdminDto) {
    return this.adminService.changeEmail(body);
  }

  @UseGuards(AdminGuard)
  @Serialize(AdminDto)
  @Patch('/change-password')
  changePassword(@Body() body: ChangePasswordAdminDto) {
    return this.adminService.updatePassword(body);
  }
}

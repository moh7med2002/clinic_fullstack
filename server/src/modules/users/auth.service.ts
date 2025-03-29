import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { hashPassword, VerifyPassword } from 'src/common/util/password.util';
import { CreateUserDto } from './dtos/create-user.dto';
import { DepartmentService } from '../department/department.service';
import { UserRoleStatus } from 'src/constants/enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly departmentService: DepartmentService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const [foundedUser, department] = await Promise.all([
      this.usersService.foundEmail(dto.email),
      this.departmentService.findByIdToCreateUser(+dto.departmentId),
    ]);
    if (foundedUser) {
      throw new BadRequestException('Email already exist');
    }
    if (dto.role === UserRoleStatus.DOCTOR && !department) {
      throw new BadRequestException('Department filed is required');
    }
    const hashedPassword = await hashPassword(dto.password);
    const newUser = await this.usersService.createUser({
      ...dto,
      password: hashedPassword,
    });
    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.foundEmail(email);
    if (!user) {
      throw new ForbiddenException('Invalid Email');
    }
    const isMatchPs = await VerifyPassword(password, user.password);
    if (!isMatchPs) {
      throw new ForbiddenException('Invalid Password');
    }
    const payload = { userId: user.id, username: user.name, role: user.role };
    return { user, access_token: await this.jwtService.signAsync(payload) };
  }
}

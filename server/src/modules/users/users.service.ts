import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { userRepositry } from 'src/constants/entityRepositry';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { hashPassword, VerifyPassword } from 'src/common/util/password.util';
import { UserChangePasswordDto } from './dtos/user-change-password.dto';
import { UserChangeEmailDto } from './dtos/user-change-email.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Department } from '../department/department.entity';
import { UserRoleStatus } from 'src/constants/enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject(userRepositry)
    private usersRepository: typeof User,
  ) {}

  async createUser(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create({
      ...userData,
    });
    return newUser;
  }

  async changeUserPassword(dto: UserChangePasswordDto, user: User) {
    const isMatch = await VerifyPassword(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid old password');
    }
    const hashedPassword = await hashPassword(dto.newPassword);
    user.password = hashedPassword;
    await user.save();
    return user;
  }

  async changeUserEmail(dto: UserChangeEmailDto, user: User) {
    const userWithEmail = await this.foundEmail(dto.email);
    if (userWithEmail) {
      throw new BadRequestException('Email Already Used');
    }
    user.email = dto.email;
    await user.save();
    return user;
  }

  updateUserInformation(dto: UpdateUserDto, user: User) {
    Object.assign(user, dto);
    return user.save();
  }

  async foundEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findWithRole(id: number, role: string) {
    return this.usersRepository.findOne({ where: { id, role } });
  }

  async findAll(role: string) {
    let whereContidion: { role: string };
    if (role) {
      whereContidion = { role: role };
    }
    console.log(whereContidion);
    const users = await this.usersRepository.findAll({
      where: whereContidion,
      include: [
        {
          model: Department,
        },
      ],
    });
    return users;
  }

  async findSingleUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      include: [{ model: Department }],
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async countUsers(role: UserRoleStatus) {
    return this.usersRepository.count({ where: { role } });
  }
}

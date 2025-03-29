import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthUserResponseDto, UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { UserRoleStatus } from 'src/constants/enum';
import { LoginUserDto } from './dtos/login.user.dto';
import { UserChangePasswordDto } from './dtos/user-change-password.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserChangeEmailDto } from './dtos/user-change-email.dto';
import { Roles } from 'src/common/metadata/user.metadata';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AdminGuard)
  @Serialize(UserDto)
  @Post('signup')
  createUser(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @Serialize(AuthUserResponseDto)
  async signUser(@Body() body: LoginUserDto) {
    const { user, access_token } = await this.authService.signin(
      body.email,
      body.password,
    );
    return { user, access_token };
  }

  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  @Get('whoamI')
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findSingleUser(user.id);
  }

  @Post('signout')
  signoutUser(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  @Patch('change-password')
  changePassword(
    @Body() body: UserChangePasswordDto,
    @CurrentUser() user: User,
  ) {
    return this.usersService.changeUserPassword(body, user);
  }

  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  @Patch('change-email')
  changeEmail(@Body() body: UserChangeEmailDto, @CurrentUser() user: User) {
    return this.usersService.changeUserEmail(body, user);
  }

  @UseGuards(AuthGuard)
  @Serialize(UserDto)
  @Patch('update-info')
  updateInformation(@Body() body: UpdateUserDto, @CurrentUser() user: User) {
    return this.usersService.updateUserInformation(body, user);
  }

  @Serialize(UserDto)
  @Get()
  getAllusers(@Query('role') role: string) {
    return this.usersService.findAll(role ? role.toLowerCase() : '');
  }

  @Serialize(UserDto)
  @Get('/:id')
  getSingleUser(@Param('id') id: string) {
    return this.usersService.findSingleUser(parseInt(id));
  }
}

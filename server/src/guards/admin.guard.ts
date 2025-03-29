// import { CanActivate, ExecutionContext } from '@nestjs/common';

// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const { adminId } = request.session || {};
//     return adminId;
//   }
// }

// token.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false; // No token provided, deny access
    }
    console.log(token);
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      return decodedToken.role === 'admin';
    } catch (error) {
      return false; // Token verification failed, deny access
    }
  }
}

// token.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRoleStatus } from 'src/constants/enum';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserRoleStatus[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false; // No token provided, deny access
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.currentUser = decodedToken; // Store the decoded token in the request

      if (!requiredRoles) {
        return true; // No roles are required, allow access
      }

      return requiredRoles.some((role) => decodedToken.role === role); // Check if user has any of the required roles
    } catch (error) {
      return false; // Token verification failed, deny access
    }
  }
}

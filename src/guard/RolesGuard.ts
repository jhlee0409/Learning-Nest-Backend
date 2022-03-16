import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = 'user-id';
    const userRole = this.getUserRole(userId);
    const roles = this.reflector.getAllAndMerge<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log('ClassRolesGuard: ', roles?.includes(userRole));
    return roles?.includes(userRole) ?? true;
  }

  private getUserRole(userId: string): string {
    //userId로 role 가져왔다 치고 그 role은 admin으로 임시
    return 'admin';
  }
}

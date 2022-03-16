import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class HandlerRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = 'user-id';
    // userId로 role 가져오기
    const userRole = this.getUserRole(userId);
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return roles?.includes(userRole) ?? true;
  }

  private getUserRole(userId: string): string {
    //userId로 role 가져왔다 치고 그 role은 admin으로 임시
    return 'user';
  }
}

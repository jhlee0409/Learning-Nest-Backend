import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // JWT 검증해서 얻은 정보를 넣습니다. 예를 위해 하드코딩함
    request.user = {
      name: 1,
      email: 'dexter.haan@gmail.com',
    };
    // return this.validateRequest(request);
    return true;
  }

  private validateRequest(request: any) {
    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class KeyGuard implements CanActivate {
  constructor(public configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const API_PERMISSION_KEY =
      this.configService.get<string>('API_PERMISSION_KEY');

    const request = context.switchToHttp().getRequest();
    const key = request.headers['x-api-key'];

    return key === API_PERMISSION_KEY;
  }
}

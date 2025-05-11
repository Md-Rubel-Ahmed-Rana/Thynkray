
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PinoLogger } from 'src/common/logger/pino-logger.service';
import { cookieName } from 'src/constants/cookie';
import { cookieOptions } from 'src/utility/cookieOptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>() 
     const response = context.switchToHttp().getResponse<Response>();
    const token = this.extractTokenFromCookie(request);
    
    if (!token) {
       this.logout(response);
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>("JWT_SECRET")
        }
      );

      request['user'] = payload;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        this.logger.error(`JWT Expired. Error: ${error?.message}`)
        console.log('JWT expired:', error);
      } else {
        this.logger.error(`JWT error. Error: ${error?.message}`)
      }
      this.logout(response);
      throw new UnauthorizedException();
    }
    return true;
  }

  private logout(response: Response): void {
    response.clearCookie(cookieName, cookieOptions);
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const bearerToken = request.cookies[cookieName] as string
    if(!bearerToken){
      this.logger.warn(`Bearer token was not found`)
      throw new UnauthorizedException();
    }
    const token = bearerToken ? bearerToken?.split(" ")[1] : undefined
    return  token
  }
}

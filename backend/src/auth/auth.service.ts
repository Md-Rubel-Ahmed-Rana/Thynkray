import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    private jwtService: JwtService,
  ) {}

   async generateAccessToken({id, email}: {id: string, email: string}): Promise<{ access_token: string }> {
    return {
      access_token: "Bearer" + " " + await   this.jwtService.signAsync({ id , email}),
    };
  }
}

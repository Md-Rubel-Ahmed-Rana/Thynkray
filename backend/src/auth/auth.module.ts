import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const configService  = new ConfigService()

@Module({
  imports: [ JwtModule.register({
      global: true,
      secret: configService.get<string>("JWT_SECRET") ,
      signOptions: { expiresIn: '1d' },
    })],
  providers: [AuthService],
})
export class AuthModule {}

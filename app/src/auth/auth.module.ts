import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [JwtAuthModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

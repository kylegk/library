import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET') || 'my-scret-passphrase',
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION') || '10m',
          },
        };
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}

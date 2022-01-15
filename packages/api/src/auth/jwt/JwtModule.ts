import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './JwtService';
import { JwtStrategy } from './JwtStrategy';
import { AuthConfigService } from '../AuthConfigService';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: async (config: AuthConfigService) => {
        return {
          secret: config.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: config.get('jwt.expiresIn'),
          },
        };
      },
      inject: [AuthConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtModule, JwtService],
})
export class JwtModule {}

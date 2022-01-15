import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { JWT_SECRET, JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: 3600_000,
          },
        };
      },
    }),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [JwtModule, JwtService],
})
export class JwtModule {}

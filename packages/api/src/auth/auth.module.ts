import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from './jwt/jwt.module';
import { CognitoModule } from './cognito/cognito.module';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, JwtModule, CognitoModule],
})
export class AuthModule {}

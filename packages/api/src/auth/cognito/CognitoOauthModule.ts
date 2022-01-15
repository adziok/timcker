import { Module } from '@nestjs/common';
import { CognitoOauthController } from './CognitoOauthController';
import { CognitoOauthStrategy } from './CognitoOauthStrategy';
import { AccountsModule } from '../../accounts/AccountsModule';
import { JwtModule } from '../jwt/JwtModule';

@Module({
  imports: [AccountsModule, JwtModule],
  controllers: [CognitoOauthController],
  providers: [CognitoOauthStrategy],
})
export class CognitoOauthModule {}

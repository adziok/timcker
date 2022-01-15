import { Module } from '@nestjs/common';
import { CognitoOauthController } from './CognitoOauthController';
import { CognitoOauthStrategy } from './CognitoOauthStrategy';
import { AccountsModule } from '../../accounts/AccountsModule';

@Module({
  imports: [AccountsModule],
  controllers: [CognitoOauthController],
  providers: [CognitoOauthStrategy],
})
export class CognitoOauthModule {}

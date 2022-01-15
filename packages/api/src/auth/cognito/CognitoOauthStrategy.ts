import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IAccountsApi } from '../../accounts/AccountsApi';
import { AuthConfigService } from '../AuthConfigService';

@Injectable()
export class CognitoOauthStrategy extends PassportStrategy(
  Strategy,
  'cognito',
) {
  private domain: string;

  constructor(
    private readonly accountsApi: IAccountsApi,
    private readonly config: AuthConfigService,
  ) {
    super({
      authorizationURL: CognitoOauthStrategy.authorizationUrl(
        config.get('cognito.domain'),
        config.get('cognito.region'),
      ),
      tokenURL: CognitoOauthStrategy.tokenUrl(
        config.get('cognito.domain'),
        config.get('cognito.region'),
      ),
      clientID: config.get('cognito.clientId'),
      clientSecret: config.get('cognito.clientSecret'),
      callbackURL: config.get('cognito.callbackUrl'),
    });
    this.domain = config.get('cognito.domain');
    this.region = config.get('cognito.region');
  }

  static baseUrl(domain: string, region: string): string {
    return `https://${domain}.auth.${region}.amazoncognito.com/oauth2`;
  }

  static authorizationUrl(domain: string, region: string): string {
    return `${this.baseUrl(domain, region)}/authorize`;
  }

  static tokenUrl(domain: string, region: string): string {
    return `${this.baseUrl(domain, region)}/token`;
  }

  static userInfoUrl(domain: string, region: string): string {
    return `${this.baseUrl(domain, region)}/userInfo`;
  }

  async validate(accessToken: string) {
    const userinfo = (
      await axios.get(
        CognitoOauthStrategy.userInfoUrl(this.domain, this.region),
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
    ).data;

    let user = await this.accountsApi.getAccountByEmail(userinfo.email);
    if (!user) {
      await this.accountsApi.createAccount({
        providerName: 'cognito',
        providerId: userinfo.sub,
        username: userinfo.username,
        email: userinfo.email,
      });
      user = await this.accountsApi.getAccountByEmail(userinfo.email);
    }

    return user;
  }
}

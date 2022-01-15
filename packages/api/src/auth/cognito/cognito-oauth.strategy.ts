import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

const USER_POOL_ID = 'eu-central-1_jza43twKu';

const COGNITO_REGION = 'eu-central-1';
const COGNITO_CLIENT_ID = '6r5i7bhj55gvkoq363p0077ou3';
const COGNITO_CLIENT_SECRET =
  '13p9n9l3udu06qnls5c8l9t71df84qd182jk5t8ev6i9lmtmkmaq';
const COGNITO_CALLBACK_URL = 'http://localhost:3000/auth/cognito/redirect';
const OAUTH_COGNITO_DOMAIN = 'timcker';

@Injectable()
export class CognitoOauthStrategy extends PassportStrategy(
  Strategy,
  'cognito',
) {
  private domain: string;

  constructor() {
    super({
      authorizationURL: CognitoOauthStrategy.authorizationUrl(
        OAUTH_COGNITO_DOMAIN,
        COGNITO_REGION,
      ),
      tokenURL: CognitoOauthStrategy.tokenUrl(
        OAUTH_COGNITO_DOMAIN,
        COGNITO_REGION,
      ),
      clientID: COGNITO_CLIENT_ID,
      clientSecret: COGNITO_CLIENT_SECRET,
      callbackURL: COGNITO_CALLBACK_URL,
    });
    this.domain = OAUTH_COGNITO_DOMAIN;
    this.region = COGNITO_REGION;
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
    // Here the `id_token` is also received: https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
    // But it's not supported by passport-oauth2, only `access_token` is received
    // Therefore another call is made to the userinfo endpoint
    const userinfo = (
      await axios.get(
        CognitoOauthStrategy.userInfoUrl(this.domain, this.region),
        { headers: { Authorization: `Bearer ${accessToken}` } },
      )
    ).data;

    const [provider, providerId] = userinfo.username.split('_');

    return userinfo;
    // let user = await this.usersService.findOneByProvider(provider, providerId);
    // if (!user) {
    //   user = await this.usersService.create({
    //     provider,
    //     providerId,
    //     name: userinfo.name,
    //     username: userinfo.email,
    //   });
    // }
    //
    // return user;
  }
}

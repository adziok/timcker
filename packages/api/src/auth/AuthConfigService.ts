import { Injectable } from '@nestjs/common';

export type TAuthConfig = {
  jwt: {
    useCookie: boolean;
    cookieKey?: string;
    expiresIn: number;
    secret: string;
  };
  cognito: {
    domain: string;
    region: string;
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
};

type TDotJoinedAuthConfig =
  | `jwt.${keyof TAuthConfig['jwt']}`
  | `cognito.${keyof TAuthConfig['cognito']}`;

@Injectable()
export class AuthConfigService {
  constructor(private readonly config: TAuthConfig) {}

  get<T extends string | boolean | number>(key: TDotJoinedAuthConfig): T {
    const keys = key.split('.');
    return this.getNestedValue(keys);
  }

  private getNestedValue(keys: string[]) {
    return keys.reduce((prev, curr) => prev[curr], this.config);
  }
}

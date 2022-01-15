import { DynamicModule, Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './AuthController';
import { JwtModule } from './jwt/JwtModule';
import { CognitoOauthModule } from './cognito/CognitoOauthModule';
import { AuthConfigService, TAuthConfig } from './AuthConfigService';

type RegisterAuthModuleOptions = {
  config: TAuthConfig;
};

type RegisterAsyncAuthModuleOptions = {
  useFactory(...args: any[]): TAuthConfig | Promise<TAuthConfig>;
  inject?: any[];
  imports?: any[];
};

@Global()
@Module({})
export class AuthModule {
  static register(options: RegisterAuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: AuthConfigService,
          useFactory: () => {
            return new AuthConfigService(options.config);
          },
        },
      ],
      imports: [PassportModule, JwtModule, CognitoOauthModule],
      exports: [AuthConfigService],
      controllers: [AuthController],
    };
  }
  static registerAsync(options: RegisterAsyncAuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: AuthConfigService,
          useFactory: (config: TAuthConfig) => new AuthConfigService(config),
          inject: ['INJECTED_AUTH_CONFIG'],
        },
        {
          provide: 'INJECTED_AUTH_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      imports: [
        PassportModule,
        JwtModule,
        CognitoOauthModule,
        ...(options.imports || []),
      ],
      exports: [AuthConfigService],
      controllers: [AuthController],
    };
  }
}

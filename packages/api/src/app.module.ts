import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AccountsModule } from './accounts/AccountsModule';
import { AuthModule } from './auth/AuthModule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TAuthConfig } from './auth/AuthConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TAuthConfig => {
        return {
          jwt: {
            expiresIn: configService.get<number>('JWT_EXPIRES_IN'),
            secret: configService.get<string>('JWT_SECRET'),
            useCookie: configService.get<boolean>('JWT_USE_COOKIE'),
            cookieKey: configService.get<string>('JWT_COOKIE_KEY'),
          },
          cognito: {
            region: configService.get<string>('COGNITO_REGION'),
            callbackUrl: configService.get<string>('COGNITO_CALLBACK_URL'),
            domain: configService.get<string>('COGNITO_DOMAIN'),
            clientId: configService.get<string>('COGNITO_CLIENT_ID'),
            clientSecret: configService.get<string>('COGNITO_CLIENT_SECRET'),
          },
          successCallbackUrl: configService.get<string>('AUTH_SUCCESS_URL'),
          failCallbackUrl: configService.get<string>('AUTH_FAILURE_URL'),
        };
      },
    }),
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

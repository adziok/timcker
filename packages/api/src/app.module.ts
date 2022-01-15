import { Module } from '@nestjs/common';
import { CognitoModule } from './auth/cognito/cognito.module';
import { JwtModule } from './auth/jwt/jwt.module';
import { AppController } from './app.controller';

@Module({
  imports: [CognitoModule, JwtModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

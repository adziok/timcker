import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { CognitoOauthGuard } from './CognitoOauthGuard';
import { JwtService } from '../jwt/JwtService';
import { AuthConfigService } from '../AuthConfigService';

@Controller('auth/cognito')
export class CognitoOauthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AuthConfigService,
  ) {}

  @Get()
  @UseGuards(CognitoOauthGuard)
  async cognitoAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(CognitoOauthGuard)
  async cognitoAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const signedData = this.jwtService.sign((req as any).user);

    res.redirect(
      this.configService.get('successCallbackUrl') +
        '?access_token=' +
        signedData.accessToken,
    );
  }
}

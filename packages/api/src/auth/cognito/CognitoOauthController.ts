import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { CognitoOauthGuard } from './CognitoOauthGuard';

@Controller('auth/cognito')
export class CognitoOauthController {
  @Get()
  @UseGuards(CognitoOauthGuard)
  async cognitoAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(CognitoOauthGuard)
  async cognitoAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // Here we can issue a JWT token to manage the user session from the app
    // For now, we'll just show the user object
    console.log((req as any).user);
    res.redirect('https://google.com');
    // return (req as any).user;
  }
}

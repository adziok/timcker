import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt/JwtGuard';

@Controller()
export class AppController {
  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return 'SIEMA';
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './auth/jwt/jwt.guard';

@Controller()
export class AppController {
  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return 'SIEMA';
  }
}

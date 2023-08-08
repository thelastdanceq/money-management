import { Controller, Get, UseGuards, Req, Res, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Controller('auth')
export class AuthController {
  constructor() {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    const token = user.jwt;
    const redirectUrl = process.env.FRONTEND_URL;

    res.redirect(`${redirectUrl}?token=${token}`);
  }
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtectedResource(@Req() req) {
    const userId = req.user.userId;
    return { userId };
  }
}

import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Res,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.interface';
import * as process from 'process';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('login')
  login(@Req() req, @Res() res, @Query('redirectUrl') redirectUrl: string) {
    res.redirect(`/auth/google?state=${redirectUrl}`);
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    const token = user.jwt;
    const redirectUrl = user.redirectUrl || process.env.FRONTEND_URL;

    console.log(user);
    res.redirect(`${redirectUrl}?token=${token}`);
  }
  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtectedResource(@Req() req) {
    const userId = req.user.userId;
    return { userId };
  }
  // @Post('refresh')
  // async refreshToken(@Body('refreshToken') oldRefreshToken: string) {
  //   const decoded = this.jwtService.decode(oldRefreshToken);
  //   const payload: JWTPayload = {
  //     email: decoded['email'],
  //     sub: decoded['sub'],
  //   };
  //   const accessToken = this.jwtService.sign(payload);
  //   const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });
  //
  //   return { accessToken, refreshToken };
  // }
}

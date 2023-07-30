import { Controller, Get, UseGuards, Req, Post, Body ,Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = req.user;
    const token = this.jwtService.sign(user);

    // Replace 'http://your-web-app.com' with the URL of your web application
    // You can append the token or other necessary data as URL parameters
    res.redirect(`http://localhost:5173?token=${token}`);
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

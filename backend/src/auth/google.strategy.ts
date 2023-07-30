import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../infra/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super({
      clientID:
        '1086729190482-armi0qi6v8dgtp13kli6j98g6is2e59o.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://ec2-13-51-168-225.eu-north-1.compute.amazonaws.com:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, displayName, provider } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };

    let userInDb = await this.usersService.findByEmail(user.email);
    if (!userInDb) {
      userInDb = await this.usersService.create(user);
    }

    const payload: JWTPayload = { email: userInDb.email, sub: userInDb._id };
    const jwt = this.jwtService.sign(payload);

    done(null, { jwt });
  }
}

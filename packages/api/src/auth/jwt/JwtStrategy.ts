import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthConfigService } from '../AuthConfigService';

export type JwtPayload = { sub: string; username: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: AuthConfigService) {
    super({
      jwtFromRequest: JwtStrategy.extractJwt,
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.secret'),
    });
  }

  static extractJwt(req, config: AuthConfigService) {
    let token = null;
    if (req && req.cookies && config.get<boolean>('jwt.useCookie')) {
      token = req.cookies[config.get<string>('jwt.cookieKey')];
    }
    return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.username };
  }
}

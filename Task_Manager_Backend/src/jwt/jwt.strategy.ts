import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../user/interfaces/user.payload';
import { cookieExtractor } from './jwt.cookie.extractor';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: UserPayload): Promise<UserPayload> {
    return payload;
  }

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }
}

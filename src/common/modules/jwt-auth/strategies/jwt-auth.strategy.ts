import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { processConfig } from 'src/common/envs/envs';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(processConfig.secret),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      signOptions: {
        expiresIn: configService.getOrThrow<string>(processConfig.tokenExp),
      },
    });
  }

  validate(payload: any) {
    return payload;
  }
}

import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { processConfig } from '../envs/envs';

export interface ITokenServicePayload {
  id: number;
}

export class TokenService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  generateToken(data: ITokenServicePayload) {
    return this.jwtService.sign(data, {
      expiresIn: '24h',
      secret: this.configService.get<string>(processConfig.secret),
    });
  }

  generateRefreshToken() {
    const code = randomBytes(10).toString('hex');
    return code;
  }
}

import { processConfig } from 'src/common/envs/envs';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtAuthService implements JwtOptionsFactory {
  @Inject(ConfigService)
  configService: ConfigService;

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>(processConfig.secret),
    };
  }
}

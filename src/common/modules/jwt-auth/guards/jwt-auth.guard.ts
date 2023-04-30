import { processConfig } from 'src/common/envs/envs';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

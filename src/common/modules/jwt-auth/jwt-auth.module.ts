import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtAuthService } from './jwt-auth.service';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtAuthService })],
  providers: [JwtAuthGuard, JwtAuthStrategy],
  exports: [JwtAuthGuard, JwtAuthStrategy],
})
export class JwtAuthModule {}

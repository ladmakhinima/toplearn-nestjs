import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import {
  ForgetPasswordDTO,
  LoginDTO,
  RefreshTokenDTO,
  SignupDTO,
} from './dtos';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: SignupDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refreshToken')
  refreshToken(@Body() body: RefreshTokenDTO, @CurrentUser() user: User) {
    return this.authService.refreshToken(body, user);
  }

  @Post('forget')
  forgetPassword(@Body() body: ForgetPasswordDTO) {
    return this.authService.forgetPassword(body);
  }
}

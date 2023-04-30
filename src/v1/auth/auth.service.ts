import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import {
  ForgetPasswordDTO,
  LoginDTO,
  RefreshTokenDTO,
  SignupDTO,
} from './dtos';
import * as bcrypt from 'bcryptjs';
import { TokenService } from 'src/common/services/token.service';
import { hashPassword } from './helper/hash-password.helper';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Inject(TokenService)
  private readonly tokenService: TokenService;

  @Inject(RefreshTokenService)
  private readonly refreshTokenService: RefreshTokenService;

  async signup(data: SignupDTO) {
    const user = await this.usersService.create(data);
    const token = this.tokenService.generateToken({ id: user.id });
    const refreshToken = this.tokenService.generateRefreshToken();
    await this.refreshTokenService.create(refreshToken, user);
    return { token, refreshToken };
  }

  async login(data: LoginDTO) {
    const user = await this.usersService.selectByEmail(data.email);
    const passwordMatching = await bcrypt.compare(data.password, user.password);
    if (!passwordMatching) {
      throw new BadRequestException(
        'email and password doesnot match with any user',
      );
    }
    const token = this.tokenService.generateToken({ id: user.id });
    const refreshToken = this.tokenService.generateRefreshToken();
    await this.refreshTokenService.create(refreshToken, user);
    return { token, refreshToken };
  }

  async forgetPassword(data: ForgetPasswordDTO) {
    const user = await this.usersService.selectByEmail(data.email);
    const newPasswordHashing = await hashPassword(data.newPassword);
    await this.usersService.update(user.id, { password: newPasswordHashing });
    return { message: 'your password updated, login again ...' };
  }

  async refreshToken(data: RefreshTokenDTO, user: User) {
    const refreshToken = await this.refreshTokenService.select(
      data.refreshToken,
      user,
    );
    const token = await this.tokenService.generateToken({
      id: user.id,
    });
    const newExpiresAt = new Date(refreshToken.expiredAt);
    newExpiresAt.setHours(
      newExpiresAt.getHours() + this.refreshTokenService.expiresAtHour,
    );
    await this.refreshTokenService.update(refreshToken.id, {
      expiredAt: newExpiresAt,
    });
    return { token, refreshToken: refreshToken.code };
  }
}

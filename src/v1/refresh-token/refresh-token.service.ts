import { UsersService } from './../users/users.service';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../users/users.entity';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  @Inject(GenericRepository<RefreshToken>)
  private readonly refreshTokenRepo: GenericRepository<RefreshToken>;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  readonly expiresAtHour = 24;

  async create(code: string, user: User) {
    const existUser = await this.usersService.selectById(user.id);
    if (!existUser) {
      throw new NotFoundException('user not found');
    }
    const refreshToken = await this.refreshTokenRepo.select({
      code,
    });
    if (refreshToken) {
      throw new BadRequestException('code is exist before');
    }
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + this.expiresAtHour);
    return this.refreshTokenRepo.create({
      user: existUser,
      expiredAt,
      code,
    });
  }

  async select(code: string, user: User) {
    const refreshToken = await this.refreshTokenRepo.select({
      code,
      user: { id: user.id },
      isDelete: false,
    });
    if (!refreshToken) {
      throw new NotFoundException('refresh token not found');
    }
    return refreshToken;
  }

  async update(id: number, data: QueryDeepPartialEntity<RefreshToken>) {
    const refreshToken = await this.refreshTokenRepo.select({
      id,
      isDelete: false,
    });
    if (!refreshToken) {
      throw new NotFoundException('refresh token is not exist');
    }
    return this.refreshTokenRepo.update({ id, isDelete: false }, data);
  }
}

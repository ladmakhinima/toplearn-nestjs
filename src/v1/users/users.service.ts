import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { hashPassword } from '../auth/helper/hash-password.helper';
import { ICreateUser } from './types';
import { User, UserStatus } from './users.entity';
import { UpdateUserDTO } from './dtos';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.entity';
import { FilesService } from '../files/files.service';
import { File } from '../files/files.entity';
import { Not } from 'typeorm';

@Injectable()
export class UsersService {
  @Inject(GenericRepository<User>)
  private readonly userRepo: GenericRepository<User>;

  @Inject(RolesService)
  private readonly rolesService: RolesService;

  @Inject(FilesService)
  private readonly filesService: FilesService;

  async create(data: ICreateUser) {
    const user = await this.userRepo.select([
      {
        email: data.email,
      },
      {
        username: data.username,
      },
    ]);

    if (user) {
      throw new BadRequestException('user exist before');
    }
    if (data.role) {
      data.role = (await this.rolesService.selectById(
        data.role as number,
      )) as Role;
    }
    if (data.image) {
      data.image = await this.filesService.selectById(data.image as number);
    }
    const passwordHashing = await hashPassword(data.password);
    return this.userRepo.create({
      ...data,
      password: passwordHashing,
      image: data.image as File,
    });
  }

  async selectByEmail(email: string) {
    const user = await this.userRepo.select({
      email,
      status: UserStatus.ACTIVE,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async updateCredit(id: number, amount: number) {
    const user = await this.selectById(id);
    return this.userRepo.update(
      { id: user.id },
      { credit: user.credit + amount },
    );
  }

  async update(id: number, data: UpdateUserDTO) {
    if (
      data.username &&
      (await this.userRepo.select({
        username: data.username,
        id: Not(id),
      }))
    ) {
      throw new BadRequestException('user exist before by username');
    }

    if (
      data.email &&
      (await this.userRepo.select({ email: data.email, id: Not(id) }))
    ) {
      throw new BadRequestException('user exist before by email');
    }
    if (data.image) {
      data.image = await this.filesService.selectById(data.image as number);
      if (!data.image) {
        throw new NotFoundException('image not found');
      }
    }
    const user = await this.selectById(id);
    return this.userRepo.update(
      { id: user.id, status: UserStatus.ACTIVE },
      data as any,
    );
  }

  async selectById(id: number) {
    const user = await this.userRepo.select({ id, status: UserStatus.ACTIVE });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  selectAll() {
    return this.userRepo.selectAll();
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PermissionAction,
  PermissionKey,
} from 'src/common/models/permission.model';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { In, Not } from 'typeorm';
import { CreatePermissionDTO, UpdatePermissionDTO } from './dtos';
import { Permission } from './permissions.entity';

@Injectable()
export class PermissionsService {
  @Inject(GenericRepository<Permission>)
  private readonly permissionsRepo: GenericRepository<Permission>;

  selectKeys() {
    return { keys: Object.values(PermissionKey) };
  }

  selectActions() {
    return { keys: Object.values(PermissionAction) };
  }

  selectAll() {
    return this.permissionsRepo.selectAll();
  }

  async selectById(id: number) {
    const permission = await this.permissionsRepo.selectById(id);
    if (!permission) {
      throw new NotFoundException('permission not found');
    }
    return permission;
  }

  async create(data: CreatePermissionDTO) {
    const existPermission = await this.permissionsRepo.select([
      { title: data.title },
      { action: data.action },
    ]);
    if (existPermission) {
      throw new BadRequestException(
        'permission exist before by title or action',
      );
    }
    return this.permissionsRepo.create({
      title: data.title,
      action: data.action,
      keys: data.keys,
    });
  }

  async update(id: number, data: UpdatePermissionDTO) {
    const permission = await this.selectById(id);
    if (
      data.title &&
      data.action &&
      (await this.permissionsRepo.select({
        title: data.title,
        action: data.action,
        id: Not(permission.id),
      }))
    ) {
      throw new BadRequestException(
        'permission exist by this title and action',
      );
    }
    return this.permissionsRepo.update({ id }, data);
  }

  async delete(id: number) {
    const permission = await this.selectById(id);
    return this.permissionsRepo.delete({ id: permission.id });
  }

  async selectByIds(ids: number[]) {
    const permissions = await this.permissionsRepo.selectAll({ id: In(ids) });
    if (permissions.length !== ids.length) {
      throw new BadRequestException('permissions is invalid');
    }
    return permissions;
  }
}

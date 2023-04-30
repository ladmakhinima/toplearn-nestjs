import { PermissionsService } from './../permissions/permissions.service';
import { Not } from 'typeorm';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Role } from './roles.entity';
import { Permission } from '../permissions/permissions.entity';
import { CreateRoleDTO, UpdateRoleDTO } from './dtos';

@Injectable()
export class RolesService {
  @Inject(GenericRepository<Role>)
  private readonly rolesRepo: GenericRepository<Role>;

  @Inject(PermissionsService)
  private readonly permissionsService: PermissionsService;

  async selectById(id: number) {
    const role = await this.rolesRepo.selectById(id);
    if (!role) {
      throw new NotFoundException('role is not exist');
    }
    return role;
  }

  async delete(id: number) {
    const role = await this.selectById(id);
    return this.rolesRepo.delete({ id: role.id });
  }

  async update(id: number, data: UpdateRoleDTO) {
    const role = await this.rolesRepo.selectById(id);
    if (
      data.title &&
      (await this.rolesRepo.select({ title: data.title, id: Not(role.id) }))
    ) {
      throw new BadRequestException('title exist before');
    }
    if (data.permissions) {
      data.permissions = (await this.permissionsService.selectByIds(
        data.permissions as number[],
      )) as Permission[];
    }
    return this.rolesRepo.update(
      { id: role.id },
      { ...data, permissions: data.permissions as Permission[] },
    );
  }

  selectAll() {
    return this.rolesRepo.selectAll();
  }

  async create(data: CreateRoleDTO) {
    const existRole = await this.rolesRepo.select({ title: data.title });
    if (existRole) {
      throw new BadRequestException('role is exist');
    }
    const permissions = await this.permissionsService.selectByIds(
      data.permissions as number[],
    );
    if (permissions.length !== data.permissions.length) {
      throw new BadRequestException('invalid permissions');
    }
    return this.rolesRepo.create({ ...data, permissions });
  }
}

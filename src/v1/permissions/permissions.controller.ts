import {
  Body,
  Controller,
  Inject,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Delete,
  Get,
} from '@nestjs/common';
import { CreatePermissionDTO, UpdatePermissionDTO } from './dtos';
import { PermissionsService } from './permissions.service';

@Controller({ version: '1', path: 'permissions' })
export class PermissionsController {
  @Inject(PermissionsService)
  private readonly permissionsService: PermissionsService;

  @Post()
  createPermission(@Body() body: CreatePermissionDTO) {
    return this.permissionsService.create(body);
  }

  @Patch(':id')
  updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePermissionDTO,
  ) {
    return this.permissionsService.update(id, data);
  }

  @Delete(':id')
  deletePermissionById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.delete(id);
  }

  @Get('keys')
  getAllKeys() {
    return this.permissionsService.selectKeys();
  }

  @Get('actions')
  getAllActions() {
    return this.permissionsService.selectActions();
  }

  @Get()
  getAllPermissions() {
    return this.permissionsService.selectAll();
  }
}

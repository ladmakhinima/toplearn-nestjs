import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoleDTO, UpdateRoleDTO } from './dtos';
import { RolesService } from './roles.service';

@Controller({ version: '1', path: 'roles' })
export class RolesController {
  @Inject(RolesService)
  private readonly rolesService: RolesService;

  @Post()
  createRole(@Body() body: CreateRoleDTO) {
    return this.rolesService.create(body);
  }

  @Delete(':id')
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.delete(id);
  }

  @Patch(':id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRoleDTO,
  ) {
    return this.rolesService.update(id, body);
  }

  @Get()
  selectAll() {
    return this.rolesService.selectAll();
  }

  @Get(':id')
  selectById(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.selectById(id);
  }
}

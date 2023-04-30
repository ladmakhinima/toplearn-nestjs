import { PermissionsModule } from './../permissions/permissions.module';
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { rolesRepositoryProvider } from '../providers.constant';

@Module({
  controllers: [RolesController],
  providers: [RolesService, rolesRepositoryProvider],
  imports: [PermissionsModule],
  exports: [RolesService],
})
export class RolesModule {}

import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { permissionRepositoryProvider } from '../providers.constant';

@Module({
  providers: [PermissionsService, permissionRepositoryProvider],
  controllers: [PermissionsController],
  exports: [PermissionsService],
})
export class PermissionsModule {}

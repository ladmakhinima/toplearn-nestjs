import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module';
import { usersRepositoryProvider } from '../providers.constant';
import { FilesModule } from '../files/files.module';

@Module({
  providers: [UsersService, usersRepositoryProvider],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [RolesModule, FilesModule],
})
export class UsersModule {}

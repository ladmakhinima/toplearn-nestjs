import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CategoriesModule } from '../categories/categories.module';
import { FilesModule } from '../files/files.module';
import { coursesRepositoryProvider } from '../providers.constant';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [CoursesService, coursesRepositoryProvider],
  exports: [CoursesService],
  controllers: [CoursesController],
  imports: [
    CategoriesModule,
    forwardRef(() => FilesModule),
    forwardRef(() => UsersModule),
  ],
})
export class CoursesModule {}

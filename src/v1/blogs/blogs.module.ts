import { CategoriesModule } from './../categories/categories.module';
import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { blogsRepositoryProvider } from '../providers.constant';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService, blogsRepositoryProvider],
  imports: [CategoriesModule, FilesModule],
})
export class BlogsModule {}

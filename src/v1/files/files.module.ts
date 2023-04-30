import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { CoursesModule } from '../courses/courses.module';
import { FilesController } from './files.controller';
import { BullModule } from '@nestjs/bull';
import { FileProcessor } from './file.processor';
import { filesRepositoryProvider } from '../providers.constant';

@Module({
  imports: [
    forwardRef(() => CoursesModule),
    BullModule.registerQueue({ name: 'file' }),
  ],
  providers: [FilesService, FileProcessor, filesRepositoryProvider],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}

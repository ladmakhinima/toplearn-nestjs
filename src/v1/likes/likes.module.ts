import { Module } from '@nestjs/common';
import { CoursesModule } from '../courses/courses.module';
import { likesRepositoryProvider } from '../providers.constant';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, likesRepositoryProvider],
  imports: [CoursesModule],
})
export class LikesModule {}

import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CoursesModule } from '../courses/courses.module';
import { commentsRepositoryProvider } from '../providers.constant';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  providers: [CommentsService, commentsRepositoryProvider],
  controllers: [CommentsController],
  imports: [CoursesModule, EventEmitterModule.forRoot()],
})
export class CommentsModule {}

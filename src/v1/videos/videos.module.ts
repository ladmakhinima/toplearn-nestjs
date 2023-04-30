import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CoursesModule } from '../courses/courses.module';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideoProcessor } from './video.processor';

@Module({
  controllers: [VideosController],
  providers: [VideosService, VideoProcessor],
  imports: [BullModule.registerQueue({ name: 'video' }), CoursesModule],
})
export class VideosModule {}

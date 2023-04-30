import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Queue } from 'bull';
import { extname } from 'path';
import { Course } from '../courses/courses.entity';
import { CoursesService } from '../courses/courses.service';
import { CreateVideoDTO } from './dtos';
import { Video } from './videos.entity';

@Injectable()
export class VideosService {
  @Inject(CoursesService)
  private readonly coursesService: CoursesService;

  constructor(@InjectQueue('video') private readonly videoProcess: Queue) {}

  async create(video: Express.Multer.File, data: CreateVideoDTO) {
    const videoExistByTitle = await Video.findOne({
      where: { title: data.title },
    });
    if (videoExistByTitle) {
      throw new BadRequestException('video exist by this title');
    }
    data.course = await this.coursesService.selectById(data.course as number);
    const fileDist = `${new Date().getTime()}${
      Math.floor(Math.random() * 1000000) + 1000000
    }`;
    this.videoProcess.add('create', {
      file: video,
      dirname: fileDist,
    });
    return Video.save({
      title: data.title,
      description: data.description,
      src: fileDist,
      course: data.course as Course,
    });
  }

  getAll() {
    return Video.find({});
  }

  async deleteById(id: number) {
    const video = await Video.findOne({ where: { id } });
    if (!video) {
      throw new NotFoundException('video is not found');
    }
    this.videoProcess.add('delete', { dest: video.src });
    return Video.delete(video.id);
  }
}



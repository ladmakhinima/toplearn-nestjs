import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesService } from '../courses/courses.service';
import { User } from '../users/users.entity';
import { Comment } from './comments.entity';
import { CreateCommentDTO, UpdateCommentDTO } from './dtos';

@Injectable()
export class CommentsService {
  constructor(
    private readonly genericRepo: GenericRepository<Comment>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(data: CreateCommentDTO & { author: User }) {
    data.course = await this.coursesService.selectById(data.course as number);
    if (data.parentComment) {
      data.parentComment = await this.selectById(data.parentComment as number);
    }
    return this.genericRepo.create(data as any);
  }

  async update(id: number, data: UpdateCommentDTO) {
    const comment = await this.selectById(id);
    if (data.course) {
      data.course = await this.coursesService.selectById(data.course as number);
    }
    if (data.parentComment) {
      data.parentComment = await this.selectById(data.parentComment as number);
    }
    return this.genericRepo.update({ id: comment.id }, data as any);
  }

  async deleteById(id: number) {
    const comment = await this.selectById(id);
    return this.genericRepo.delete({ id: comment.id });
  }

  selectAll() {
    return this.genericRepo.selectAll();
  }

  async selectById(id: number) {
    const comment = await this.genericRepo.selectById(id);
    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }
}

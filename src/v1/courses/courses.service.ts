import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CategoriesService } from '../categories/categories.service';
import { File } from '../files/files.entity';
import { FilesService } from '../files/files.service';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { Course, CourseStatus } from './courses.entity';
import { CreateCourseDTO, UpdateCourseDTO } from './dtos';

@Injectable()
export class CoursesService {
  @Inject(GenericRepository)
  private readonly genericRepo: GenericRepository<Course>;

  @Inject(CategoriesService)
  private readonly categoriesService: CategoriesService;

  @Inject(FilesService)
  private readonly filesService: FilesService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  async selectById(id: number) {
    const course = await this.genericRepo.selectById(id);
    if (!course) {
      throw new NotFoundException('course is not found');
    }
    return course;
  }

  async create(data: CreateCourseDTO) {
    const titleExist = await this.genericRepo.select({ title: data.title });
    if (titleExist) {
      throw new BadRequestException('title exist before');
    }
    const categories = await this.categoriesService.selectByIds(
      data.categories as number[],
    );
    if (categories.length !== data.categories.length) {
      throw new BadRequestException('categories data is invalid');
    }
    const file = await this.filesService.selectById(data.image);
    data.teacher = await this.usersService.selectById(data.teacher as number);
    return this.genericRepo.create({
      title: data.title,
      image: file,
      categories,
      teacher: data.teacher as User,
      level: data.level,
      price: data.price,
      description: data.description,
      status: CourseStatus.NOT_START,
    });
  }

  async update(data: UpdateCourseDTO, id: number, teacher: User) {
    const course = await this.selectById(id);
    if (course.teacher.id !== teacher.id) {
      throw new ForbiddenException('only teacher access');
    }

    if (data.title) {
      const titleExist = await this.genericRepo.select({ title: data.title });
      if (titleExist) {
        throw new BadRequestException('title exist before');
      }
    }

    if (data.categories) {
      const categories = await this.categoriesService.selectByIds(
        data.categories as number[],
      );
      if (categories.length !== data.categories.length) {
        throw new BadRequestException('categories data is invalid');
      }
      data.categories = categories;
    }

    if (data.image) {
      const file = await this.filesService.selectById(data.image as number);
      data.image = file as File;
    }
    return this.genericRepo.update({ id: course.id }, data as any);
  }

  async delete(id: number, teacher: User) {
    const course = await this.selectById(id);
    return this.genericRepo.delete({
      id: course.id,
      teacher: { id: teacher.id },
    });
  }

  selectAll() {
    return this.genericRepo.selectAll();
  }
}

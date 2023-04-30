import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import { User } from '../users/users.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDTO, UpdateCourseDTO } from './dtos';

@Controller({ version: '1', path: 'courses' })
export class CoursesController {
  @Inject(CoursesService)
  coursesService: CoursesService;

  // @UseGuards(JwtAuthGuard)
  @Post()
  createCourse(@Body() body: CreateCourseDTO) {
    return this.coursesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCourse(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.coursesService.delete(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCourse(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCourseDTO,
  ) {
    return this.coursesService.update(body, id, user);
  }

  @Get()
  selectAllCourse() {
    return this.coursesService.selectAll();
  }

  @Get(':id')
  selectById(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.selectById(id);
  }
}

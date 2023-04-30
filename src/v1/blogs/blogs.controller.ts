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
import { BlogsService } from './blogs.service';
import { CreateBlogDTO, UpdateBlogDTO } from './dtos';

@Controller({ path: 'blogs', version: '1' })
export class BlogsController {
  @Inject(BlogsService)
  private readonly blogsService: BlogsService;

  @UseGuards(JwtAuthGuard)
  @Post()
  createBlog(@CurrentUser() user: User, @Body() body: CreateBlogDTO) {
    return this.blogsService.create({ author: user, ...body });
  }

  @Get()
  getBlogs() {
    return this.blogsService.selectAll();
  }

  @Get(':id')
  getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.selectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateBlogById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBlogDTO,
  ) {
    return this.blogsService.update(id, body);
  }
}

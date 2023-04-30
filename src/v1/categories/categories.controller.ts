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
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';

@Controller({ version: '1', path: 'categories' })
export class CategoriesController {
  @Inject(CategoriesService)
  private readonly categoriesService: CategoriesService;

  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() body: CreateCategoryDTO) {
    return this.categoriesService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDTO,
  ) {
    return this.categoriesService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }

  @Get()
  selectAllCategories(@Query('format') format: 'simple' | 'tree') {
    return this.categoriesService.selectAll(format);
  }

  @Get(':id')
  getSingleCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.selectById(id);
  }
}

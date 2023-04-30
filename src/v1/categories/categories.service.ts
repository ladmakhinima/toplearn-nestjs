import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './categories.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';
import { Not } from 'typeorm';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly genericRepo: CategoriesRepository) {}

  async create(data: CreateCategoryDTO) {
    const titleOrSlugTakeBefore = await this.genericRepo.select([
      { title: data.title },
      { slug: data.slug },
    ]);
    if (titleOrSlugTakeBefore) {
      throw new BadRequestException('title or slug is take before');
    }
    if (data.parent) {
      const parentCategory = await this.genericRepo.selectById(
        data.parent as number,
      );
      if (!parentCategory) {
        throw new NotFoundException('parent category is not exist');
      }
      data.parent = parentCategory;
    }
    return this.genericRepo.create({
      ...data,
      parent: data?.parent as Category,
    });
  }

  async delete(id: number) {
    const isCategoryExist = await this.genericRepo.selectById(id);
    if (!isCategoryExist) {
      throw new NotFoundException('category is not exist');
    }
    const isParentCategory = await this.genericRepo.select({ parent: { id } });
    if (isParentCategory) {
      throw new BadRequestException('You cant delete category that is parent');
    }
    return this.genericRepo.delete({ id });
  }

  async update(id: number, data: UpdateCategoryDTO) {
    const isCategoryExist = await this.genericRepo.selectById(id);
    if (!isCategoryExist) {
      throw new NotFoundException('category is not exist');
    }
    if (data.title) {
      const titleExist = await this.genericRepo.select({
        title: data.title,
        id: Not(id),
      });

      if (!!titleExist) {
        throw new BadRequestException('title is exist before');
      }
    }
    if (data.slug) {
      const slugExist = await this.genericRepo.select({
        slug: data.slug,
        id: Not(id),
      });

      if (!!slugExist) {
        throw new BadRequestException('slug is exist before');
      }
    }
    if (data.parent) {
      data.parent = await this.genericRepo.select({
        parent: {
          id: data.parent as number,
        },
      });

      if (!data.parent) {
        throw new NotFoundException('parent category is not found');
      }
    }
    return this.genericRepo.update({ id }, data as any);
  }

  selectAllSimpleFormat() {
    return this.genericRepo.selectAll();
  }

  selectAllByTreeFormat() {
    return this.genericRepo.selectTrees();
  }

  selectAll(type: 'simple' | 'tree') {
    return type === 'simple'
      ? this.selectAllSimpleFormat()
      : this.selectAllByTreeFormat();
  }

  async selectById(id: number) {
    const category = await this.genericRepo.selectById(id);
    if (!category) {
      throw new NotFoundException('category not found');
    }
    return category;
  }

  selectByIds(ids: number[]) {
    return this.genericRepo.selectByIds(ids);
  }
}

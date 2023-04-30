import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { CoursesService } from '../courses/courses.service';
import { Discount, DiscountType } from './discounts.entity';
import { CreateDiscountDTO, UpdateDiscountDTO } from './dtos';

@Injectable()
export class DiscountsService {
  @Inject(GenericRepository<Discount>)
  private readonly genericRepo: GenericRepository<Discount>;

  @Inject(CoursesService)
  private readonly coursesService: CoursesService;

  async create(data: CreateDiscountDTO) {
    const codeExist = await this.genericRepo.select({ code: data.code });
    if (codeExist) {
      throw new BadRequestException('code exist before');
    }
    data.course = await this.coursesService.selectById(data.course as number);
    if (!data.course) {
      throw new NotFoundException('course is not found');
    }
    return this.genericRepo.create(data as any);
  }

  async update(id: number, updatedData: UpdateDiscountDTO) {
    const discount = await this.selectById(id);
    if (updatedData.course) {
      updatedData.course = await this.coursesService.selectById(
        updatedData.course as number,
      );
    }
    return this.genericRepo.update({ id: discount.id }, updatedData as any);
  }

  async deleteById(id: number) {
    const discount = await this.selectById(id);
    return this.genericRepo.delete({ id: discount.id });
  }

  selectAll() {
    return this.genericRepo.selectAll();
  }

  async selectById(id: number) {
    const discount = await this.genericRepo.selectById(id);
    if (!discount) {
      throw new NotFoundException('discount is not found');
    }
    return discount;
  }

  async validateDiscount(id: number, courseId?: number) {
    const discount = await this.selectById(id);
    if (discount.quantity === 0) {
      throw new BadRequestException('discount has no capacity');
    }
    if (new Date(discount.expiredAt).getTime() < new Date().getTime()) {
      throw new BadRequestException('discount is expired ...');
    }
    if (
      discount.course.id !== courseId &&
      discount.type === DiscountType.Single
    ) {
      throw new NotFoundException('discount is not found');
    }
    return discount;
  }
}

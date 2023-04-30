import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { DataSource } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { Discount } from '../discounts/discounts.entity';
import { DiscountsService } from '../discounts/discounts.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDTO } from './dtos';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  @Inject(GenericRepository)
  private readonly genericRepo: GenericRepository<Order>;

  @Inject(CoursesService)
  private readonly coursesService: CoursesService;

  @Inject(DiscountsService)
  private readonly discountsService: DiscountsService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Inject(DataSource)
  private readonly datasoruce: DataSource;

  async createOrder(data: CreateOrderDTO) {
    return this.datasoruce.transaction(async (entityManager) => {
      try {
        await entityManager.queryRunner.connect();
        await entityManager.queryRunner.startTransaction();
        data.course = await this.coursesService.selectById(
          data.course as number,
        );
        if (data.discount) {
          data.discount = await this.discountsService.selectById(
            data.discount as number,
          );
          await this.discountsService.validateDiscount(
            data.discount.id,
            data.course.id,
          );
          await this.discountsService.update(data.discount.id, {
            quantity: data.discount.quantity - 1,
          });
        }
        data.user = await this.usersService.selectById(data.user as number);
        if (data.course.discount) {
          if (data.course.discount.quantity === 0) {
            await this.discountsService.deleteById(data.course.discount.id);
          } else {
            await this.discountsService.update(data.course.discount.id, {
              quantity: data.course.discount.quantity - 1,
            });
          }
        }
        const totalPrice = data.course.calculatePrice(
          (data.discount as Discount)?.percent || 0,
        );
        if (data.user.credit < totalPrice) {
          throw new BadRequestException('credit not enough');
        }
        await this.usersService.updateCredit(
          data.user.id,
          data.user.credit - totalPrice,
        );
        return this.genericRepo.create({
          ...(data as any),
          finalAmount: totalPrice,
        });
      } catch (error) {
        await entityManager.queryRunner.rollbackTransaction();
        console.log(error.message, error.status);
      } finally {
        await entityManager.queryRunner.release();
      }
    });
  }

  selectAllOrders() {
    return this.genericRepo.selectAll();
  }

  async selectById(id: number) {
    const order = await this.genericRepo.selectById(id);
    if (!order) {
      throw new NotFoundException('order is not found');
    }
    return order;
  }

  async deleteOrderById(id: number) {
    return this.datasoruce.transaction(async (entityManager) => {
      try {
        await entityManager.queryRunner.connect();
        await entityManager.queryRunner.startTransaction();
        const order = await this.selectById(id);
        await this.usersService.updateCredit(
          order.customer.id,
          order.customer.credit + order.finalAmount,
        );
        return this.genericRepo.delete({ id: order.id });
      } catch (error) {
        await entityManager.queryRunner.rollbackTransaction();
      } finally {
        await entityManager.queryRunner.release();
      }
    });
  }
}

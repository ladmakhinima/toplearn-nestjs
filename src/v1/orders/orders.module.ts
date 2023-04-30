import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ordersRepositoryProvider } from '../providers.constant';
import { CoursesModule } from '../courses/courses.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [OrdersService, ordersRepositoryProvider],
  controllers: [OrdersController],
  imports: [CoursesModule, DiscountsModule, UsersModule],
})
export class OrdersModule {}

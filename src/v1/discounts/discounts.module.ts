import { Module } from '@nestjs/common';
import { CoursesModule } from '../courses/courses.module';
import { discountsRepositoryProvider } from '../providers.constant';
import { DiscountsController } from './discounts.controller';
import { DiscountsService } from './discounts.service';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService, discountsRepositoryProvider],
  imports: [CoursesModule],
  exports: [DiscountsService],
})
export class DiscountsModule {}

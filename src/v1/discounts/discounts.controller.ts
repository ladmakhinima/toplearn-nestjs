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
} from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateDiscountDTO, UpdateDiscountDTO } from './dtos';

@Controller({ path: 'discounts', version: '1' })
export class DiscountsController {
  @Inject(DiscountsService)
  private readonly discountsService: DiscountsService;

  @Post()
  createDiscount(@Body() body: CreateDiscountDTO) {
    return this.discountsService.create(body);
  }

  @Patch(':id')
  updateDiscount(
    @Body() body: UpdateDiscountDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.discountsService.update(id, body);
  }

  @Get()
  getDiscounts() {
    return this.discountsService.selectAll();
  }

  @Get(':id')
  getSingleDiscount(@Param('id', ParseIntPipe) id: number) {
    return this.discountsService.selectById(id);
  }

  @Delete(':id')
  deleteDiscount(@Param('id', ParseIntPipe) id: number) {
    return this.discountsService.deleteById(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateOrderDTO } from './dtos';
import { OrdersService } from './orders.service';

@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  @Inject(OrdersService)
  private readonly ordersService: OrdersService;

  @Post()
  createOrder(@Body() body: CreateOrderDTO) {
    return this.ordersService.createOrder(body);
  }

  @Get()
  selectAllOrders() {
    return this.ordersService.selectAllOrders();
  }

  @Get(':id')
  singleOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.selectById(id);
  }

  @Delete(':id')
  revertOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.deleteOrderById(id);
  }
}

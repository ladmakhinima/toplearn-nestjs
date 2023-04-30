import {
  Body,
  Controller,
  Inject,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import { User } from '../users/users.entity';
import {
  ChangeStatusTransactionDTO,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from './dtos';
import { TransactionsService } from './transactions.service';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'transactions', version: '1' })
export class TransactionsController {
  @Inject(TransactionsService)
  private readonly transactionsService: TransactionsService;

  @Post()
  createTransaction(@Body() body: CreateTransactionDTO) {
    return this.transactionsService.createTransaction(body);
  }

  @Patch('status/:id')
  updateStatusTransaction(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() body: ChangeStatusTransactionDTO,
  ) {
    return this.transactionsService.changeStatusTransaction(id, body, user);
  }

  @Patch(':id')
  updateTransaction(
    @Body() body: UpdateTransactionDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.transactionsService.updateTransaction(id, body);
  }

  @Delete(':id')
  deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.deleteTransaction(id);
  }

  @Get()
  getAllTransactions() {
    return this.transactionsService.selectAllTransactions();
  }

  @Get(':id')
  getSingleTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.selectSingleTransaction(id);
  }
}

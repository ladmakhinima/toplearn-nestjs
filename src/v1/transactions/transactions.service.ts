import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { BanksService } from '../banks/banks.service';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import {
  ChangeStatusTransactionDTO,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from './dtos';
import { Transaction, TransactionStatus } from './transactions.entity';

@Injectable()
export class TransactionsService {
  @Inject(GenericRepository)
  private readonly genericRepository: GenericRepository<Transaction>;

  @Inject(BanksService)
  private readonly banksService: BanksService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  async createTransaction(data: CreateTransactionDTO) {
    data.bank = await this.banksService.selectBankById(data.bank as number);
    data.user = await this.usersService.selectById(data.user as number);
    return this.genericRepository.create(data as any);
  }

  async deleteTransaction(id: number) {
    const transaction = await this.genericRepository.selectById(id);
    return this.genericRepository.delete({ id: transaction.id });
  }

  selectAllTransactions() {
    return this.genericRepository.selectAll();
  }

  async updateTransaction(id: number, data: UpdateTransactionDTO) {
    const transaction = await this.genericRepository.selectById(id);
    if (!transaction || transaction.status === TransactionStatus.CONFIRM) {
      throw new NotFoundException('transaction not found');
    }
    if (data.bank) {
      data.bank = await this.banksService.selectBankById(data.bank as number);
    }
    if (data.user) {
      data.user = await this.usersService.selectById(data.user as number);
    }
    return this.genericRepository.update({ id }, data as any);
  }

  async selectSingleTransaction(id: number) {
    const transaction = await this.genericRepository.selectById(id);
    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }
    return transaction;
  }

  async changeStatusTransaction(
    id: number,
    body: ChangeStatusTransactionDTO,
    currentUser: User,
  ) {
    const transaction = await this.selectSingleTransaction(id);
    if (body.status === TransactionStatus.CONFIRM) {
      const confirmedTransaction = await this.genericRepository.update(
        { id: transaction.id },
        {
          status: TransactionStatus.CONFIRM,
          registerBy: currentUser,
          registerAt: new Date(),
        },
      );
      await this.usersService.updateCredit(
        transaction.user.id,
        transaction.amount,
      );
      return confirmedTransaction;
    }
    return this.genericRepository.update(
      { id: transaction.id },
      { status: body.status },
    );
  }
}

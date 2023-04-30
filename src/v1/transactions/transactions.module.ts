import { Module } from '@nestjs/common';
import { BanksModule } from '../banks/banks.module';
import { transactionsRepositoryProvider } from '../providers.constant';
import { UsersModule } from '../users/users.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [BanksModule, UsersModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, transactionsRepositoryProvider],
})
export class TransactionsModule {}

import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { banksRepositoryProvider } from '../providers.constant';

@Module({
  providers: [BanksService, banksRepositoryProvider],
  controllers: [BanksController],
  exports: [BanksService],
})
export class BanksModule {}

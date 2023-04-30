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
import { BanksService } from './banks.service';
import { CreateBankDTO, UpdateBankDTO } from './dtos';

@Controller({ version: '1', path: 'banks' })
export class BanksController {
  @Inject(BanksService)
  private readonly bankService: BanksService;

  @Post()
  createBank(@Body() body: CreateBankDTO) {
    return this.bankService.createBank(body);
  }

  @Delete(':id')
  deleteBank(@Param('id', ParseIntPipe) id: number) {
    return this.bankService.deleteBank(id);
  }

  @Patch(':id')
  updateBank(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBankDTO,
  ) {
    return this.bankService.updateBank(id, body);
  }

  @Get()
  getAllBanks() {
    return this.bankService.selectBanks();
  }

  @Get(':id')
  getSingleBank(@Param('id', ParseIntPipe) id: number) {
    return this.bankService.selectBankById(id);
  }
}

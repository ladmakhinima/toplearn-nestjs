import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Not } from 'typeorm';
import { Bank } from './banks.entity';
import { CreateBankDTO, UpdateBankDTO } from './dtos';

@Injectable()
export class BanksService {
  @Inject(GenericRepository)
  private readonly genericRepository: GenericRepository<Bank>;

  async createBank(data: CreateBankDTO) {
    const hasTitleOrSlugSaved = await this.genericRepository.select([
      { name: data.name },
      { slug: data.slug },
    ]);
    if (hasTitleOrSlugSaved) {
      throw new BadRequestException('this title or slug saved before');
    }
    return this.genericRepository.create(data);
  }

  async deleteBank(id: number) {
    const bank = await this.selectBankById(id);
    return this.genericRepository.delete({ id: bank.id });
  }

  async updateBank(id: number, data: UpdateBankDTO) {
    const bank = await this.selectBankById(id);
    if (
      data.name &&
      (await this.genericRepository.select({ name: data.name, id: Not(id) }))
    ) {
      throw new BadRequestException('title exist before');
    }
    if (
      data.slug &&
      (await this.genericRepository.select({ name: data.slug, id: Not(id) }))
    ) {
      throw new BadRequestException('slug exist before');
    }
    return this.genericRepository.update({ id: bank.id }, data);
  }

  selectBanks() {
    return this.genericRepository.selectAll();
  }

  async selectBankById(id: number) {
    const bank = await this.genericRepository.selectById(id);
    if (!bank) {
      throw new NotFoundException('bank is not found');
    }
    return bank;
  }
}

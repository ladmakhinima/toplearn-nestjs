import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { File, FileType } from './files.entity';

@Injectable()
export class FilesService {
  @Inject(GenericRepository<File>)
  private readonly fileRepo: GenericRepository<File>;

  constructor(@InjectQueue('file') private readonly fileQueue: Queue) {}

  async selectById(id: number) {
    const file = await this.fileRepo.selectById(id);
    if (!file) {
      throw new NotFoundException('file not found');
    }
    return file;
  }

  create(file: Express.Multer.File, type: FileType) {
    const customFilename = `${Date.now()}-${Math.floor(
      Math.random() * 100000000000,
    )}${path.extname(file.originalname)}`;
    this.fileQueue.add('create', { file, customFilename });
    return this.fileRepo.create({
      mimetype: file.mimetype,
      size: file.size,
      name: customFilename,
      type,
    });
  }

  async delete(id: number) {
    const file = await this.selectById(id);
    this.fileQueue.add('delete', { name: file.name });
    return this.fileRepo.delete({ id: file.id });
  }

  selectAll() {
    return this.fileRepo.selectAll();
  }
}

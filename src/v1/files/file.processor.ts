import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { createWriteStream, unlinkSync } from 'fs';
import { Readable } from 'stream';
@Processor('file')
export class FileProcessor {
  @Process({ name: 'create' })
  createFile(
    process: Job<{ file: Express.Multer.File; customFilename: string }>,
  ) {
    const buffer = (process.data.file.buffer as any).data;
    const readbleStream = new Readable();
    const writeStream = createWriteStream(
      `./public/${process.data.customFilename}`,
    );
    readbleStream.push(new Uint8Array(buffer));
    readbleStream.push(null);
    readbleStream.pipe(writeStream);
  }

  @Process({ name: 'delete' })
  deleteFile(process: Job<{ name: string }>) {
    unlinkSync(`./public/${process.data.name}`);
  }
}

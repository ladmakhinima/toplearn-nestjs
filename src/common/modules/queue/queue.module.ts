import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';

@Module({
  imports: [BullModule.forRootAsync({ useClass: QueueService })],
})
export class QueueModule {}

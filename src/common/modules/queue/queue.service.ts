import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService implements SharedBullConfigurationFactory {
  createSharedConfiguration():
    | BullRootModuleOptions
    | Promise<BullRootModuleOptions> {
    return {
      redis: {
        host: 'localhost',
        port: 6379,
      },
    };
  }
}

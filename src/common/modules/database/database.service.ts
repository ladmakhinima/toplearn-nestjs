import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Permission } from 'src/v1/permissions/permissions.entity';
import { RefreshToken } from 'src/v1/refresh-token/refresh-token.entity';
import { Role } from 'src/v1/roles/roles.entity';
import { User } from 'src/v1/users/users.entity';
import { Inject } from '@nestjs/common';
import { processConfig } from 'src/common/envs/envs';
import { Course } from 'src/v1/courses/courses.entity';
import { Category } from 'src/v1/categories/categories.entity';
import { Comment } from 'src/v1/comments/comments.entity';
import { Like } from 'src/v1/likes/likes.entity';
import { Blog } from 'src/v1/blogs/blogs.entity';
import { File } from 'src/v1/files/files.entity';
import { Transaction } from 'src/v1/transactions/transactions.entity';
import { Bank } from 'src/v1/banks/banks.entity';
import { Discount } from 'src/v1/discounts/discounts.entity';
import { Order } from 'src/v1/orders/orders.entity';
import { Notification } from 'src/common/notifications/notifications.entity';
import { Video } from 'src/v1/videos/videos.entity';

export class DatabaseService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  configService: ConfigService;
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      username: this.configService.getOrThrow<string>(processConfig.dbUser),
      password: this.configService.getOrThrow<string>(processConfig.dbPass),
      host: this.configService.getOrThrow<string>(processConfig.dbHost),
      port: +this.configService.getOrThrow<string>(processConfig.dbPort),
      database: this.configService.getOrThrow<string>(processConfig.dbName),
      type: this.configService.getOrThrow<string>(processConfig.dbType) as any,
      entities: [
        RefreshToken,
        User,
        Role,
        Permission,
        Course,
        Category,
        Comment,
        Like,
        Blog,
        File,
        Bank,
        Transaction,
        Discount,
        Order,
        Notification,
        Video,
      ],
      synchronize: true,
    };
  }
}

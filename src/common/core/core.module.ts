import { QueueModule } from './../modules/queue/queue.module';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigsModule } from '../modules/configs/configs.module';
import { DatabaseModule } from '../modules/database/database.module';
import { JwtAuthModule } from '../modules/jwt-auth/jwt-auth.module';
import { TokenService } from '../services/token.service';
import { CommentsEvents } from '../events/comments.event';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    JwtAuthModule,
    QueueModule,
    NotificationsModule,
  ],
  providers: [TokenService, JwtService, CommentsEvents],
  exports: [CommentsEvents],
})
export class CoreModule {}

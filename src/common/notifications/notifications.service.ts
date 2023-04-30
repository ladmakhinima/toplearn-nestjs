import { Injectable } from '@nestjs/common';
import { CreateNotificationDTO } from './dtos';
import { Notification } from './notifications.entity';

@Injectable()
export class NotificationsService {
  create(data: CreateNotificationDTO) {
    return Notification.save({
      action: data.action,
      parameters: data.parameters,
      type: data.type,
    });
  }

  selectAll() {
    return Notification.find({});
  }
}

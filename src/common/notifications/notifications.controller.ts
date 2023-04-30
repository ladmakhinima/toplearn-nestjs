import { Controller, Get, Inject } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  @Inject(NotificationsService)
  private readonly notificationsService: NotificationsService;

  @Get()
  getNotifications() {
    return this.notificationsService.selectAll();
  }
}

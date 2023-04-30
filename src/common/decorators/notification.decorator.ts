import { NotificationsService } from '../notifications/notifications.service';

export function Notification() {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...data: any) {
      const notificationsService = new NotificationsService();
      const result = await originalMethod.apply(this, data);
      await notificationsService.create({
        action: this.model.name,
        type: property,
        parameters: JSON.stringify({ data: data.at(-1) }),
      });
      return result;
    };
  };
}

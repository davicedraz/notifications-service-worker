import { NotificationRequest } from '../../ports/adapters/notification-request';
import { NotificationResponse } from '../../ports/adapters/notification-response';

export interface SendNotification {
  execute(notification: NotificationRequest): Promise<NotificationResponse>
}
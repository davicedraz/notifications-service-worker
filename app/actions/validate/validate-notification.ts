import { NotificationRequest } from '../../ports/adapters/notification-request';

export interface ValidateNotification {
  execute(notification: NotificationRequest): Promise<Boolean>
}
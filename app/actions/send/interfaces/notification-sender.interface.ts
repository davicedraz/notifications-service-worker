import { NotificationRequest } from '../../../adapters/notification-request';
import { NotificationResponse } from '../../../adapters/notification-response';

export interface NotificationSender {
  execute(notification: NotificationRequest): NotificationResponse
}
import { NotificationRequest } from '../../../entities/notification/dto/notification-request';
import { NotificationResponse } from '../../../entities/notification/dto/notification-response';

export interface NotificationSender {
  execute(notification: NotificationRequest): NotificationResponse
}
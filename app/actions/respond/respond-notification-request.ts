import { NotificationResponse } from '../../ports/adapters/notification-response';

export interface RespondNotificationRequest {
  execute(notificationResponse: NotificationResponse): Promise<NotificationResponse>
}
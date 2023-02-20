import { NotificationResponse } from '../../ports/adapters/notification-response';

export interface NotificationRequestRespondent {
  execute(notificationResponse: NotificationResponse): Promise<NotificationResponse>
}
import { Notification } from '../../../entities/notification/notification.entity';

export interface SenderProvider {
  send(notification: Notification);
}
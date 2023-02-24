import { NotificationDTO } from '../../../entities/notification/dto/notification.dto';

export interface NotificationSender {
  execute(notification: NotificationDTO)
}
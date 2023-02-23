import { NotificationDTO } from '../../../entities/notification/dto/notification.dto';
import { Notification } from '../../../entities/notification/notification.entity';

export interface NotificationSender {
  execute(notification: NotificationDTO): Promise<Notification>
}
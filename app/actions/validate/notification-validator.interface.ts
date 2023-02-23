import { NotificationDTO } from './../../entities/notification/dto/notification.dto';

export interface NotificationValidator {
  execute(notification: NotificationDTO): Boolean
}
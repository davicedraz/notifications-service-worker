import { NotificationRequest } from '../../entities/notification/dto/notification-request';

export interface NotificationValidator {
  execute(notification: NotificationRequest): Boolean
}
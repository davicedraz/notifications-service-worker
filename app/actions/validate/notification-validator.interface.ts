import { NotificationRequest } from './../../adapters/notification-request';

export interface NotificationValidator {
  execute(notification: NotificationRequest): Boolean
}
import { NotificationRequest } from '../../ports/adapters/notification-request';

export interface NotificationValidator {
  execute(notification: NotificationRequest): Promise<Boolean>
}
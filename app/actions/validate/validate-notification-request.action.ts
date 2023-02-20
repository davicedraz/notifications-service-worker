import { NotificationRequest } from "../../adapters/notification-request";
import { NotificationValidator } from "./notification-validator.interface";

export class ValidateNotificationRequest implements NotificationValidator {

  execute(notificationRequest: NotificationRequest): Boolean {
    const validations = [
      this.handleNofiticationRequestChannel(notificationRequest.channel)
    ];

    return validations.every(validation => {
      return validation;
    });
  }

  private handleNofiticationRequestChannel(channel: string) {
    const isChannelValid = typeof channel === 'string';
    return isChannelValid;
  }

}
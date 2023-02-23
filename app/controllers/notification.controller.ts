import { InvalidNotificationRequestError } from '../errors/invalid-notification-request.error';
import { NotificationValidator } from '../actions/validate/notification-validator.interface';
import { NotificationSender } from '../actions/send/interfaces/notification-sender.interface';
import { NotificationDTO } from '../entities/notification/dto/notification.dto';

export class NotificationController {
  private readonly validateNotification: NotificationValidator;
  private readonly sendNotification: NotificationSender;

  constructor(
    sendNotification: NotificationSender,
    validateNotification: NotificationValidator,
  ) {
    this.validateNotification = validateNotification;
    this.sendNotification = sendNotification;
  }

  public async handle(newNotification: NotificationDTO) {
    try {
      const isValid = this.validateNotification.execute(newNotification);
      if (!isValid) throw new InvalidNotificationRequestError();

      this.sendNotification.execute(newNotification);
    } catch (error) {
      console.log(error); //FIXME:
      throw error;
    }

  }

}
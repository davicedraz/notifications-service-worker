import { InvalidNotificationRequestError } from '../errors/invalid-notification-request.error';
import { NotificationValidator } from '../actions/validate/notification-validator.interface';
import { NotificationRequestRespondent } from '../actions/respond/notification-request-respondent.interface';
import { NotificationSender } from '../actions/send/interfaces/notification-sender.interface';
import { NotificationRequest } from '../entities/notification/dto/notification-request';
import { NotificationResponse } from '../entities/notification/dto/notification-response';

export class NotificationController {
  private readonly validateNotification: NotificationValidator;
  private readonly sendNotification: NotificationSender;
  // private readonly respondNotification: NotificationRequestRespondent;

  constructor(sendNotification: NotificationSender, validateNotification: NotificationValidator) {
    this.validateNotification = validateNotification;
    this.sendNotification = sendNotification;
    // this.respondNotification = respondNotification;
  }

  public async handle(newNotification: NotificationRequest): Promise<NotificationResponse> {
    try {
      const isValid = await this.validateNotification.execute(newNotification);
      if (!isValid) throw new InvalidNotificationRequestError();

      const response = await this.sendNotification.execute(newNotification);
      // await this.respondNotification.execute(response);

      return response;

    } catch (error) {
      console.log(error); //FIXME:
      throw error;
    }

  }

}
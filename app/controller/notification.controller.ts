import { InvalidNotificationRequestError } from './errors/invalid-notification-request.error';
import { ValidateNotification } from '../actions/validate/validate-notification';
import { RespondNotificationRequest } from '../actions/respond/respond-notification-request';
import { SendNotification } from '../actions/send/send-notification';
import { NotificationRequest } from '../ports/adapters/notification-request';
import { NotificationResponse } from '../ports/adapters/notification-response';

export class NotificationController {

  private readonly validateNotification: ValidateNotification;
  private readonly sendNotification: SendNotification;
  private readonly respondNotification: RespondNotificationRequest;

  constructor(validateNotification: ValidateNotification, sendNotification: SendNotification, respondNotification: RespondNotificationRequest) {
    this.validateNotification = validateNotification;
    this.sendNotification = sendNotification;
    this.respondNotification = respondNotification;
  }

  public async handle(newNotification: NotificationRequest): Promise<NotificationResponse> {
    try {
      const isValid = await this.validateNotification.execute(newNotification);
      if (!isValid) throw new InvalidNotificationRequestError("");

      const response = await this.sendNotification.execute(newNotification);
      await this.respondNotification.execute(response);

      return response;

    } catch (error) {
      console.log(error); //FIXME:
      return error;
    }

  }

}
import { SendNotification } from "./actions/send/send-notification.action";
import { ValidateNotificationRequest } from "./actions/validate/validate-notification-request.action";
import { NotificationController } from "./controller/notification.controller";
import { NotificationConsumer } from "./ports/kafka/consumer/notification.consumer";

require('dotenv').config();

class Application {
  private readonly notificationSender: SendNotification;
  private readonly notificationValidator: ValidateNotificationRequest;
  private readonly notificationController: NotificationController;
  private readonly notificationConsumer: NotificationConsumer;

  constructor() {
    this.notificationSender = new SendNotification();
    this.notificationValidator = new ValidateNotificationRequest();
    this.notificationController = new NotificationController(this.notificationSender, this.notificationValidator);
    this.notificationConsumer = new NotificationConsumer(this.notificationController);
  }

  public run() {
    this.notificationConsumer.consume();
  }

  // private verifyEnvironment() {
  //   const requiredEnvs = [];
  //   requiredEnvs.forEach((env) => {
  //     if (!(env in process.env)) {
  //       throw new Error(`Env variable ${env} is not defined`);
  //     }
  //   });
  // }

}

const app = new Application();
app.run();

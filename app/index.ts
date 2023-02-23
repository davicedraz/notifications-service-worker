import { SendNotification } from "./actions/send/send-notification.action";
import { ValidateNotificationRequest } from "./actions/validate/validate-notification-request.action";
import { NotificationController } from "./controllers/notification.controller";
import { AmqpConsumer } from "./ports/amqp/consumer/amqp.consumer";

require('dotenv').config();

class Application {
  private readonly notificationSender: SendNotification;
  private readonly notificationValidator: ValidateNotificationRequest;
  private readonly notificationController: NotificationController;
  private readonly notificationConsumer: AmqpConsumer;

  constructor() {
    this.notificationSender = new SendNotification();
    this.notificationValidator = new ValidateNotificationRequest();
    this.notificationController = new NotificationController(this.notificationSender, this.notificationValidator);
    this.notificationConsumer = new AmqpConsumer(this.notificationController);
  }

  public run() {
    this.verifyEnvironment();
    this.notificationConsumer.consume();
  }

  private verifyEnvironment() {
    const requiredEnvs = [
      'RABBIT_MQ_URI',
      'RABBIT_MQ_QUEUE',
      'PUBLIC_WEB_PUSH_KEY',
      'PRIVATE_WEB_PUSH_KEY'
    ];
    requiredEnvs.forEach((env) => {
      if (!(env in process.env)) {
        throw new Error(`Env variable ${env} is not defined`);
      }
    });
  }

}

const app = new Application();
app.run();

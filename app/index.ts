import { SendNotification } from "./actions/send/send-notification.action";
import { NotificationController } from "./controller/notification.controller";
import { NotificationConsumer } from "./ports/kafka/consumer/notification.consumer";

require('dotenv').config();

class Application {
  private readonly sendNotification: SendNotification;
  private readonly notificationController: NotificationController;
  private readonly notificationConsumer: NotificationConsumer;

  constructor() {
    this.sendNotification = new SendNotification();
    this.notificationController = new NotificationController(this.sendNotification);
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

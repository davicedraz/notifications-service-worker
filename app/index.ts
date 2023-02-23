import { SendNotification } from "./actions/send/send-notification.action";
import { ValidateNotificationRequest } from "./actions/validate/validate-notification-request.action";
import { NotificationController } from "./controllers/notification.controller";
import { RabbitmqConsumer } from "./ports/amqp/consumer/rabbitmq.consumer";

import * as amqp from 'amqplib/callback_api';
require('dotenv').config();

class Application {
  private readonly notificationSender: SendNotification;
  private readonly notificationValidator: ValidateNotificationRequest;
  private readonly notificationController: NotificationController;
  private readonly notificationConsumer: RabbitmqConsumer;
  private readonly rabbitmqURI = process.env.RABBIT_MQ_URI as string;

  constructor() {
    this.notificationSender = new SendNotification();
    this.notificationValidator = new ValidateNotificationRequest();
    this.notificationController = new NotificationController(this.notificationSender, this.notificationValidator);
    this.notificationConsumer = new RabbitmqConsumer(this.notificationController);
  }

  private connectRabbitmq() {
    // var amqp = require('amqplib/callback_api');

    amqp.connect(this.rabbitmqURI, function (err, conn) {
      conn.createChannel(function (err, ch) {
        var q = 'notifications';

        ch.assertQueue(q, { durable: true });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
          if (msg !== null)
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
      });
    });
  }

  public run() {
    this.connectRabbitmq();
    // this.notificationConsumer.consume();
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

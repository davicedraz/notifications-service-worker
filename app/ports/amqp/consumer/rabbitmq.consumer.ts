import { RabbitmqMessageDTO } from './../dto/rabbitmq-message.dto';
import { NotificationRequest } from "../../../entities/notification/dto/notification-request";
import { NotificationController } from "../../../controllers/notification.controller";

export class RabbitmqConsumer {
  private readonly notificationController: NotificationController

  constructor(notificationController: NotificationController) {
    this.notificationController = notificationController;
  }

  public consume() {

    // var amqp = require('amqplib/callback_api');

    // amqp.connect('amqp://localhost:5672', function (err, conn) {
    //   conn.createChannel(function (err, ch) {
    //     var q = 'hello';

    //     ch.assertQueue(q, { durable: false });
    //     ch.prefetch(1);
    //     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    //     ch.consume(q, function (msg) {
    //       console.log(" [x] Received %s", msg.content.toString());
    //     }, { noAck: true });
    //   });
    // });

    const newMessages = [{
      data: {
        user_email: "davioler@gmail.com",
        title: "Finalize a compra do seu carrinho",
        content: "Controle multimídia e outros 2 produtos",
        image_url: "https://cdn-icons-png.flaticon.com/512/34/34627.png?w=360",
        channel: "web_push",
        send_after: "2015-09-24 14:00:00 GMT-0300",
      }
    },
      // {
      //   data: {
      //     user_email: "davioler@gmail.com",
      //     title: "Finalize a compra do seu carrinho",
      //     content: "Controle multimídia e outros 2 produtos",
      //     image_url: "https://cdn-icons-png.flaticon.com/512/34/34627.png?w=360",
      //     channel: "sms",
      //     send_after: "2015-09-24 14:00:00 GMT-0300",
      //   }
      // }
    ];

    newMessages.forEach(async message => {
      const notificationRequest = this.createNotificationRequestFromKafkaMessage(message);
      await this.notificationController.handle(notificationRequest);
    });
  }

  public createNotificationRequestFromKafkaMessage(message: RabbitmqMessageDTO): NotificationRequest {
    const title = message.data.title;
    const userEmail = message.data.user_email;
    const content = message.data.content;
    const imageURL = message.data.image_url;
    const channel = message.data.channel;

    return new NotificationRequest(title, content, imageURL, channel, userEmail);
  }

}
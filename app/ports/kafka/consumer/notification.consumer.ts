import { NotificationRequest } from "../../adapters/notification-request";
import { NotificationController } from "../../../controller/notification.controller";

export class NotificationConsumer {
  private readonly notificationController: NotificationController

  constructor(notificationController: NotificationController) {
    this.notificationController = notificationController;
  }

  public consume() {
    const newMessages = [{
      data: {
        user_email: "davioler@gmail.com",
        title: "Finalize a compra do seu carrinho",
        content: "Controle multimídia e outros 2 produtos",
        image_url: "https://cdn-icons-png.flaticon.com/512/34/34627.png?w=360",
        channel: "web_push",
        send_after: "2015-09-24 14:00:00 GMT-0300",
      }
    }];

    newMessages.forEach(async message => {
      const notification = NotificationRequest.fromKafka(message);
      await this.notificationController.handle(notification);
    });
  }

}
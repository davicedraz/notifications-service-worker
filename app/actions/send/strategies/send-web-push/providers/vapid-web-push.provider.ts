import { SenderProvider } from "../../../interfaces/sender.provider.interface";
import { Notification } from '../../../../../entities/notification/notification.entity';
import { MissingCredentialsError } from "../../../../../errors/missing-credentials.error";
import WebPush from "web-push";

require('dotenv').config();
const { PUBLIC_WEB_PUSH_KEY, PRIVATE_WEB_PUSH_KEY } = process.env;

export class VAPIDWebPush implements SenderProvider {

  constructor() {
    const publicKey = PUBLIC_WEB_PUSH_KEY as string;
    const privateKey = PRIVATE_WEB_PUSH_KEY as string;

    WebPush.setVapidDetails('mailto:test@test.com', publicKey, privateKey);
    // WebPush.generateVAPIDKeys();
  }

  async send(notification: Notification) {
    console.log(notification);
    const userWebPushSubscription = notification.recipient.webPushSubscription;
    if (!userWebPushSubscription) throw new MissingCredentialsError(notification.channel);

    const payload = JSON.stringify({
      title: notification.title,
      body: notification.content,
      image: notification.imageURL
    });

    await WebPush.sendNotification(userWebPushSubscription, payload);
  }
}

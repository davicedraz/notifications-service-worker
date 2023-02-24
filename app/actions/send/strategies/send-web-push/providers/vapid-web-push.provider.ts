import { SenderProvider } from "../../../interfaces/sender.provider.interface";
import { Notification } from '../../../../../entities/notification/notification.entity';
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

    const payload = JSON.stringify({
      title: notification.title,
      body: notification.content,
      image: notification.imageURL
    });

    await WebPush.sendNotification(this.userWebPushSubscription, payload);
  }

  private userWebPushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/dyXYLtSNMVE:APA91bH7F3OUnZCaFtlXDFo3MD2nnMkYad_ryXy9nLnU8e4izljiZFX1RHHbeHQ5GqZqxC7hPtAlNsC4iwiXGmfrXgvmgyIKlOrcuPSD3uIh6VogaUfhJcZLaOy4CfKspFFTxus85GlV",
    keys: {
      p256dh: "BFJAWKen0CGhacIdCRS_2Y7gPMPljDhil53XAlB66unOAv0TUf3dJgZp3_SBfUqWIRFMIo3cVBuAuNLKaI8jVb8",
      auth: "A9HPWGf9sTg84JcEgNemxA"
    }
  }
}

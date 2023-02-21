import { SenderProvider } from "../../../interfaces/sender.provider.interface";
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

  send() {
    WebPush.sendNotification(this.userWebPushSubscription, 'Test: web push coming from backend');
  }

  private userWebPushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/eMha2sDl-D8:APA91bFAKDaZKCO8s-YY02fKaR4a52SazSIel_nICjG3wB-viunqBqsbLf27Wlg1L39hppQ6r0npKmdaWbxoil-0L4rOxV5HQuQSjZhCVCd2pxgHBKWiXkG0xQNegRBBhQsHpjv4BD0E",
    keys: {
      p256dh: "BH8PSqCcmd99S9vkz0to2DeU8wQCDNI9zdmHlGTlaUGp3dhlb7TX6uI-z1498VVkl8mXl3YSdw_Fy0LLMZ0u2lM",
      auth: "RXt4fi8nC7kEe2m7DeLo9Q"
    }
  }
}

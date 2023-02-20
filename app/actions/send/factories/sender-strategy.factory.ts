import { SenderProvider } from './../interfaces/sender.provider.interface';
import { XptoSenderProvider } from './../providers/xpto.provider';
import { SendWebPushStrategy } from './../strategies/send-web-push/send-web-push.strategy';
import { SenderStrategy } from "../strategies/sender.strategy";
import { Notification } from './../../../entities/notification/notification.entity';

export class SenderStrategyFactory {

  private readonly notification: Notification;
  private readonly provider: SenderProvider;

  constructor(notification: Notification) {
    this.notification = notification;
    this.provider = new XptoSenderProvider();
  }

  create(): SenderStrategy { 
    return new SendWebPushStrategy(this.provider);
  }

}
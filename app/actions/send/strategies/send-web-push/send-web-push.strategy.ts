import { Notification } from './../../../../entities/notification/notification.entity';
import { SenderStrategy } from "../sender.strategy";
import { SenderProvider } from './../../interfaces/sender.provider.interface';

export class SendWebPushStrategy extends SenderStrategy {

  constructor(senderProvider: SenderProvider) {
    super(senderProvider);
  }

  send(notification: Notification): Notification {
    const dispatch = this.senderProvider.send();
    return notification;
  }
}
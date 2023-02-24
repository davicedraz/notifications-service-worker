import { SenderStrategy } from "../sender.strategy";
import { SenderProvider } from './../../interfaces/sender.provider.interface';
import { VAPIDWebPush } from './providers/vapid-web-push.provider';
import { Notification } from '../../../../entities/notification/notification.entity';

export class SendWebPushStrategy extends SenderStrategy {

  constructor(preferredProvider?: SenderProvider) {
    const defaultProvider = new VAPIDWebPush();
    const senderProvider = preferredProvider || defaultProvider;
    
    super(senderProvider);
  }

  send(notification: Notification) {
    return this.senderProvider.send(notification);
  }
}
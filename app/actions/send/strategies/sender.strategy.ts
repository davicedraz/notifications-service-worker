import { Notification } from './../../../entities/notification/notification.entity';
import { SenderProvider } from '../interfaces/sender.provider.interface';

export abstract class SenderStrategy {

  constructor(protected readonly senderProvider: SenderProvider) {
    this.senderProvider = senderProvider;
  }

  send(notification: Notification) {
    throw new Error(`Abstract method call`);
  }

}
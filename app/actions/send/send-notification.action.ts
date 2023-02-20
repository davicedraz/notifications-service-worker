import { SenderStrategyFactory } from './factories/sender-strategy.factory';
import { NotificationResponse } from '../../adapters/notification-response';
import { NotificationSender } from './interfaces/notification-sender.interface';
import { NotificationChannel } from '../../entities/notification/notification-channel';
import { NotificationRequest } from '../../adapters/notification-request';
import { Notification } from '../../entities/notification/notification.entity';

export class SendNotification implements NotificationSender {

  execute(notificationRequest: NotificationRequest): NotificationResponse {
    const { title, content, imageURL, channel } = notificationRequest;
    const notification = new Notification(title, content, imageURL, (<any>NotificationChannel)[channel]);

    const strategyFactory = new SenderStrategyFactory(notification);
    const senderStrategy = strategyFactory.create();

    const notificationSent = senderStrategy.send(notification);
    const response: NotificationResponse = { status: "ok", result: notificationSent };
    return response;
  }

}
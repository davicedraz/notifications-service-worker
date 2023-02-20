import { MissingSenderStrategyError } from './../../../errors/missing-strategy.error';
import { SendWebPushStrategy } from './../strategies/send-web-push/send-web-push.strategy';
import { SenderStrategy } from "../strategies/sender.strategy";
import { Notification } from './../../../entities/notification/notification.entity';
import { NotificationChannel } from '../../../entities/notification/notification-channel';

export class SenderStrategyFactory {
  private readonly notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  private strategiesByNotificationChannel: { [key in NotificationChannel]: () => SenderStrategy } = {
    [NotificationChannel.WEB_PUSH]: () => {
      return new SendWebPushStrategy();
    },
    [NotificationChannel.SMS]: () => {
      throw new MissingSenderStrategyError(NotificationChannel.SMS);
    },
    [NotificationChannel.EMAIL]: () => {
      throw new MissingSenderStrategyError(NotificationChannel.EMAIL);
    },
    [NotificationChannel.MOBILE_PUSH]: () => {
      throw new MissingSenderStrategyError(NotificationChannel.MOBILE_PUSH);
    }
  };

  create(): SenderStrategy {
    const chosenStrategy = this.strategiesByNotificationChannel[this.notification.channel];
    return chosenStrategy();
  }

}
import { NotificationDTO } from './../../entities/notification/dto/notification.dto';
import { SenderStrategyFactory } from './factories/sender-strategy.factory';
import { NotificationSender } from './interfaces/notification-sender.interface';
import { NotificationChannel } from '../../entities/notification/notification-channel';
import { Notification } from '../../entities/notification/notification.entity';
import { RabbitmqChannel } from '../../ports/amqp/rabbitmq/rabbitmq.singleton';

export class SendNotification implements NotificationSender {
  private readonly rabbitmqOpenChannel: RabbitmqChannel;

  constructor() {
    this.rabbitmqOpenChannel = RabbitmqChannel.getInstance();
  }

  public async execute(notificationRequest: NotificationDTO) {
    const { id, title, content, imageUrl, channel } = notificationRequest;
    const notification = new Notification(title, content, imageUrl, channel as NotificationChannel);

    const senderProvider = this.getSenderStrategyProvider(notification);
    const notificationSent = senderProvider.send(notification);

    this.acknowledgeMessage(notificationRequest);
    console.log(`Message ${id} sended via ${channel}`);

    return notificationSent;
  }

  private async acknowledgeMessage(notificationRequest: NotificationDTO) {
    const amqpChannel = await this.rabbitmqOpenChannel.getChannel();
    amqpChannel.ack(notificationRequest.originalMessage);
  }

  private getSenderStrategyProvider(notification: Notification) {
    const strategyFactory = new SenderStrategyFactory(notification);
    return strategyFactory.create();
  }

}
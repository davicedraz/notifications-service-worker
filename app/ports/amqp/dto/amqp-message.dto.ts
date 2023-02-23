import { NotificationDTO } from './../../../entities/notification/dto/notification.dto';
import * as amqp from 'amqplib/callback_api';

export class AmqpMessageDTO {
  id: string;
  pattern: string;
  data: any;
  rawMessage: amqp.Message

  constructor(message: amqp.Message) {
    const messageData = JSON.parse(message.content.toString());
    this.id = messageData.id;
    this.pattern = messageData.pattern;
    this.data = messageData.data;
    this.rawMessage = message;
  }

  public toNotification(): NotificationDTO {
    return NotificationDTO.fromJSON({
      id: this.data.notification.id,
      title: this.data.notification.title,
      content: this.data.notification.content,
      imageUrl: this.data.notification.imageUrl,
      channel: this.data.notification.channel,
      userEmail: this.data.notification.userEmail,
      sendAfter: this.data.notification.sendAfter,
      sentAt: this.data.notification.sentAt,
      originalMessage: this.rawMessage
    });
  }

}
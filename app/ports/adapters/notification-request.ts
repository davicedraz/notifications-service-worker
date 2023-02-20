import { KafkaMessage } from './../kafka/kafka-message';

export class NotificationRequest {
  title: string;
  content: string;
  imageURL: string;
  channel: string;
  userEmail: string;

  static fromKafka(message: KafkaMessage): NotificationRequest {
    return {
      title: message.data.title,
      userEmail: message.data.user_email,
      content: message.data.content,
      imageURL: message.data.image_url,
      channel: message.data.channel
    }
  }
}
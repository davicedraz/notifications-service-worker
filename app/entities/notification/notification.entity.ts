import { NotificationChannel } from "./notification-channel";

export class Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly imageURL: string;
  public readonly channel: NotificationChannel;
  public readonly recipient: any

  constructor(title: string, content: string, imageURL: string, channel: NotificationChannel, recipient: any) {
    this.title = title;
    this.content = content;
    this.imageURL = imageURL;
    this.channel = channel;
    this.recipient = recipient;
    Object.freeze(this);
  }

}
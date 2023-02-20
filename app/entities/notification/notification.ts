import { NotificationChannel } from "./notification-channel";

export class Notification {
  public readonly title: string;
  public readonly content: string;
  public readonly imageURL: string;
  public readonly channel: NotificationChannel;

  constructor(title: string, content: string, imageURL: string, channel: NotificationChannel) {
    this.title = title;
    this.content = content;
    this.imageURL = imageURL;
    this.channel = channel;
    Object.freeze(this);
  }

}
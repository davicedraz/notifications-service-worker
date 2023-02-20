export class NotificationRequest {
  title: string;
  content: string;
  imageURL: string;
  channel: string;
  userEmail: string;

  constructor(title: string, content: string, imageURL: string, channel: string, userEmail: string) {
    this.title = title;
    this.userEmail = userEmail;
    this.content = content;
    this.imageURL = imageURL;
    this.channel = channel;
  }

}
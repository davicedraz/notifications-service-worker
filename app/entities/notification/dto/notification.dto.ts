export class NotificationDTO {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  channel: string;
  userEmail: string;
  sendAfter: Date;
  sentAt: Date;
  originalMessage: any;

  constructor({ id = '', title = '', content = '', imageUrl = '', channel = '', userEmail = '', sendAfter = new Date(), sentAt = new Date(), originalMessage,
  }: Partial<NotificationDTO> = {}) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.imageUrl = imageUrl;
    this.channel = channel;
    this.userEmail = userEmail;
    this.sendAfter = sendAfter;
    this.sentAt = sentAt;
    this.originalMessage = originalMessage;
  }

  public static fromJSON(json: any): NotificationDTO {
    return new NotificationDTO(json);
  }
}

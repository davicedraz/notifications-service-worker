import { NotificationChannel } from "../entities/notification/notification-channel"

export class MissingCredentialsError extends Error {
  constructor(channel: NotificationChannel) {
    super('Missing user credentials to send ' + channel + ' notifications.')
    this.name = 'MissingCredentialsError'
  }
}
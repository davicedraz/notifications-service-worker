export class InvalidNotificationRequestError extends Error {
  constructor(reason: string) {
    super('Invalid by: ' + reason + '.')
    this.name = 'InvalidNotificationRequest'
  }
}
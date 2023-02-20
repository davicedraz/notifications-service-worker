export class InvalidNotificationRequestError extends Error {
  constructor() {
    super('Notification request failed some validation')
    this.name = 'InvalidNotificationRequest'
  }
}
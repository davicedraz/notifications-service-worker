import { NotificationChannel } from "../entities/notification/notification-channel"

export class MissingSenderStrategyError extends Error {
  constructor(channel: NotificationChannel) {
    super('Missing sender strategy for: ' + channel + '.')
    this.name = 'MissingSenderStrategyError'
  }
}
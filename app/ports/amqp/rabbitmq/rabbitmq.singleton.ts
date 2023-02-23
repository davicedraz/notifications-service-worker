import * as amqp from 'amqplib/callback_api';
require('dotenv').config();

export class RabbitmqChannel {
  private static instance: RabbitmqChannel;
  private channel: amqp.Channel | null = null;

  private constructor() { }

  public static getInstance(): RabbitmqChannel {
    if (!RabbitmqChannel.instance) {
      RabbitmqChannel.instance = new RabbitmqChannel();
    }

    return RabbitmqChannel.instance;
  }

  public async getChannel(): Promise<amqp.Channel> {
    if (!this.channel) {
      const uri = process.env.RABBIT_MQ_URI as string;
      const queue = process.env.RABBIT_MQ_QUEUE as string;

      const connection = await this.connect(uri);
      console.log('Connected on:', process.env.RABBIT_MQ_URI);

      this.channel = await this.createChannel(connection);
      this.channel.assertQueue(queue, { durable: true });
      this.channel.prefetch(1);

      console.log(" [*] Waiting messages in %s", queue);
    }

    return this.channel;
  }

  private async connect(uri: string): Promise<amqp.Connection> {
    return new Promise<amqp.Connection>((resolve, reject) => {
      amqp.connect(uri, (err, conn) => {
        if (err) reject(err);
        else resolve(conn);
      });
    });
  }

  private async createChannel(connection: amqp.Connection) {
    return new Promise<amqp.Channel>((resolve, reject) => {
      connection.createChannel((err, ch) => {
        if (err) reject(err);
        else resolve(ch);
      });
    });
  }
}

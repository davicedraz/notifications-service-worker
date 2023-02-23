import { AmqpMessageDTO } from '../dto/amqp-message.dto';
import { RabbitmqChannel } from '../rabbitmq/rabbitmq.singleton';
import { NotificationController } from "../../../controllers/notification.controller";

require('dotenv').config();

export class AmqpConsumer {
  private readonly notificationController: NotificationController;
  private readonly rabbitmqChannel: RabbitmqChannel;

  constructor(notificationController: NotificationController) {
    this.notificationController = notificationController;
    this.rabbitmqChannel = RabbitmqChannel.getInstance();
    this.consume = this.consume.bind(this);
  }

  public async consume() {
    const channel = await this.rabbitmqChannel.getChannel();
    const queue = process.env.RABBITMQ_QUEUE as string;

    channel.consume(queue, async (message) => {
      if (message == null) return;
      console.log(" [x] Received notification request %s", message.content.toString());
      try {
        const newMessage = new AmqpMessageDTO(message);
        await this.notificationController.handle(newMessage.toNotification());
        // channel.ack(message);
      } catch (error) {
        console.error(error);
        channel.nack(message, false, false);
      }
    }, { noAck: false });
  }
}

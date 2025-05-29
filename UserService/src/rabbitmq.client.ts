import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const rabbitmqClient = ClientProxyFactory.create({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://qwe:qwe@rabbitmq:5672'],
    queue: 'user_queue',
    queueOptions: {
      durable: false,
    },
  },
});
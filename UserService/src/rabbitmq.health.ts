import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { HealthIndicatorFunction } from '@nestjs/terminus';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQHealthIndicator {
  checkRabbitMQ(): HealthIndicatorFunction {
    return async (): Promise<HealthIndicatorResult> => {
      const key = 'rabbitmq';

      try {
        const conn = await amqp.connect('amqp://qwe:qwe@rabbitmq:5672');
        await conn.close();

        return {
          [key]: {
            status: 'up',
          },
        };
      } catch (error) {
        return {
          [key]: {
            status: 'down',
            message: error.message,
          },
        };
      }
    };
  }
}


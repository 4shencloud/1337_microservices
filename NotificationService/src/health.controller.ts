import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { RabbitMQHealthIndicator } from './rabbitmq.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
    private http: HttpHealthIndicator,
    private rabbit: RabbitMQHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const results = await this.health.check([
      () => this.mongoose.pingCheck('mongo'),
      () => this.http.pingCheck('self', 'http://localhost:6001'),
      this.rabbit.checkRabbitMQ(),
    ]);

    const isHealthy = Object.values(results).every((val: any) =>
      val?.status === 'up'
    );

    if (!isHealthy) {
      throw new ServiceUnavailableException(results);
    }

    return results;
  }
}

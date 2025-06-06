import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { RabbitMQHealthIndicator } from './rabbitmq.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private rabbit: RabbitMQHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const results = await this.health.check([
      () => this.http.pingCheck('self', 'http://localhost:6001/ping'),
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

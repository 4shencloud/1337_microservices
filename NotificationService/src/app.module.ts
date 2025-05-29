import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { RabbitMQHealthIndicator } from './rabbitmq.health';
import { HealthCheck, TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TerminusModule,
    HttpModule
  ],
  controllers: [AppController, HealthController],
  providers: [RabbitMQHealthIndicator],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}

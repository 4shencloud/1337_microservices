import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './middleware'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'
import { User, UserSchema } from './user/user.schema'
import { RabbitMQHealthIndicator } from './rabbitmq.health';
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    MongooseModule.forRoot('mongodb://root:example@mongo:27017/dbname', {
      authSource: 'admin',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, UserService, RabbitMQHealthIndicator],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FingerprintMiddleware, LoggerMiddleware } from './middleware'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'
import { User, UserSchema } from './user/user.schema'

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/test2"),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
    consumer.apply(FingerprintMiddleware).forRoutes("*")
  }
}

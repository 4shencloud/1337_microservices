import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { HttpExceptionFilter } from './filter'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()
  app.use('/stripe/webhook', express.raw({ type: 'application/json' }))
  await app.listen(process.env.PORT ?? 4000)
}
bootstrap()

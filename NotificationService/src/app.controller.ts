import { Controller, Get } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
  ) {}

  @Get("/ping")
  getPing() {
    return { status: 'pong' }
  }

  @EventPattern("user.created")
  handleUserCreated(data: any) {
    console.log("---> MSG USER CREATED:", data)
  }

  @EventPattern("user.deleted")
  handleUserDeleted(data: any) {
    console.log("---> MSG USER DELETED:", data)
  }
}

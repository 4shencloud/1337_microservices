import { Controller, Post, Body, Get, Param, Request, UseGuards, Req, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { UserService } from './user/user.service'
import { UserDocument } from './user/user.schema'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get("/ping")
  getPing() {
    return this.appService.getPing();
  }
}

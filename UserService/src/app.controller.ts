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
  getPing(): string {
    return this.appService.getPing()
  }
}


/*  JUNK

  @Get("/parrot/:word")
  getParrot(@Param("word") word) {
    return word
  }

  @Get("/parrot-int/:word")
  getParrotInt(@Param("word", ParseIntPipe) word) {
    return word
  }

  @Post("/testpost")
  testPost(@Body() dto: TestDto) {
    return dto.name
  }

*/
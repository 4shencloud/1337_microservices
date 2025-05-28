import { Controller, Get, UseGuards, Request, Post, UseInterceptors, UploadedFile } from "@nestjs/common"
import { UserService } from "./user.service"

@Controller("/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get("/")
  async getSelf(@Request() req) {
  }
}
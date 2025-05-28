import { Controller, Get, UseGuards, Request, Post, UseInterceptors, UploadedFile, Body, Delete } from "@nestjs/common"
import { UserService } from "./user.service"
import { QueryDto, UserDto } from "./user.dto"

@Controller("/user")
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post("")
  async createUser(@Body() dto: UserDto) {
    const { name, email } = dto;

    const newUser = await this.userService.createUser(name, email);

    return {
      success: 1,
      newUser
    };
  }

  @Get("")
  async getUsers(@Body() dto: QueryDto) {
    const { page, pageSize } = dto;

    const users = await this.userService.queryUsers(page, pageSize);

    return {
      success: 1,
      users
    };
  }

  @Delete("")
  async deleteUser(@Body() dto: UserDto) {
    try {
      await this.userService.deleteUser(dto);
    } catch(e) {
      return {
        success: 0
      };
    }

    return {
      success: 1
    };
  }
}
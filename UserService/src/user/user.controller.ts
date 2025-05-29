import { Controller, Get, Post, Body, Delete, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { QueryDto, UserDto } from "./user.dto";
import { rabbitmqClient } from "../rabbitmq.client";

@Controller("/user")
export class UserController {
  private client: ClientProxy;

  constructor(
    private readonly userService: UserService,
  ) {
    this.client = rabbitmqClient;
  }

  @Post("")
  async createUser(@Body() dto: UserDto) {
    const { name, email } = dto;

    const newUser = await this.userService.createUser(name, email);

    this.client.emit('user.created', { name, email });

    return {
      success: 1,
      data: newUser
    };
  }

  @Delete("")
  async deleteUser(@Body() dto: UserDto) {
    try {
      await this.userService.deleteUser(dto);

      this.client.emit('user.deleted', { email: dto.email });

      return { success: 1 };
    } catch(e) {
      return { success: 0 };
    }
  }

  @Get("")
  async getUsers(@Body() dto: QueryDto) {
    const { page = 1, pageSize = 10 } = dto;

    const { users, totalCount } = await this.userService.queryUsers(page, pageSize);
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      success: 1,
      data: {
        pageSize,
        totalCount,
        totalPages,
        users,
      }
    };
  }
}

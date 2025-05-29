import { Controller, Get, Post, Body, Delete, Inject, Query, Param, Patch, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { QueryDto, UserDto } from "./user.dto";
import { rabbitmqClient } from "../rabbitmq.client";

@Controller("/user")
export class UserController {
  private client: ClientProxy;

  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
  ) {
    this.client = rabbitmqClient;
  }

  private handleError(e: any) {
    this.logger.error(e);

    const errorResp = e?.errorResponse?.errmsg || e?.message || 'Unknown error';

    return {
      success: 0,
      error: errorResp
    };
  }

  @Post("")
  async createUser(@Body() dto: UserDto) {
    const { name, email } = dto;

    try {
      const newUser = await this.userService.createUser({ name, email });
      this.client.emit('user.created', { name, email });

      return {
        success: 1,
        data: newUser
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  @Patch("/:_id")
  async updateUser(@Param('_id') _id: string, @Body() dto: UserDto) {
    const { name, email } = dto;

    try {
      const updatedUser = await this.userService.updateUser(_id, { name, email });

      if (!updatedUser) {
        return { success: 0, error: "user not found" };
      }

      return {
        success: 1,
        data: updatedUser
      };
    } catch (e) {
      return this.handleError(e);
    }
  }

  @Delete("")
  async deleteUser(@Body() dto: UserDto) {
    try {
      const result = await this.userService.deleteUser(dto);

      if (result) {
        this.client.emit('user.deleted', { email: dto.email });
      }

      return { success: result };
    } catch (e) {
      return this.handleError(e);
    }
  }

  @Get("")
  async getUsers(@Query() dto: QueryDto) {
    const { page = 1, pageSize = 10 } = dto;

    try {
      const { users, totalCount } = await this.userService.queryUsers(+page, +pageSize);
      const totalPages = Math.ceil(totalCount / +pageSize);

      return {
        success: 1,
        data: {
          pageSize: +pageSize,
          totalCount,
          totalPages,
          users,
        }
      };
    } catch (e) {
      return this.handleError(e);
    }
  }
}

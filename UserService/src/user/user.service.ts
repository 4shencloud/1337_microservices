import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "./user.schema"
import { Model } from "mongoose"

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
  ) {}

  async createUser(email: string, name: string): Promise<UserDocument> {
    const newUser = await this.userModel.create({ email, name });
    return newUser;
  }

  async queryUsers(page: number, pageSize: number): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  async deleteUser({ name, email }: { name: string, email: string }): Promise<void> {
    const query: any = {};

    if (name) {
      query.name = name;
    } else if (email) {
      query.email = email;
    } else {
      throw new Error("no query");
    }

    await this.userModel.updateOne(query, {
      $set: {
        isDeleted: true
      }
    });
  }
}
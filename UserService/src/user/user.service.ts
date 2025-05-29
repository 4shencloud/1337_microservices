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

  async queryUsers(page: number, pageSize: number): Promise<{
    users: UserDocument[];
    totalCount: number;
  }> {
    const skip = (page - 1) * pageSize;

    const result = await this.userModel.aggregate([
      {
        $facet: {
          users: [
            { $skip: skip },
            { $limit: pageSize }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      }
    ]).exec();

    const users = result[0].users;
    const totalCount = result[0].totalCount[0]?.count || 0;

    return { users, totalCount };
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
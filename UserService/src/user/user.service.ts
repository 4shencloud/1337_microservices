import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User, UserDocument } from "./user.schema"
import { Model, ObjectId } from "mongoose"

interface UserArg {
  email: string;
  name: string;
}

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
  ) {}

  async createUser({ email, name }: UserArg): Promise<UserDocument> {
    this.logger.debug("createUser hit");

    const newUser = await this.userModel.create({ email, name });

    return newUser;
  }

  async updateUser(_id: string | ObjectId, { email, name }: UserArg): Promise<UserDocument | null> {
    this.logger.debug("updateUser hit");

    const newUser = await this.userModel.findByIdAndUpdate(_id, {
      email, name
    }, { new: true, runValidators: true });

    return newUser;
  }

  async queryUsers(page: number, pageSize: number): Promise<{
    users: UserDocument[];
    totalCount: number;
  }> {
    this.logger.debug("queryUsers hit");

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

  async deleteUser({ name, email }: UserArg): Promise<number> {
    this.logger.debug("deleteUser hit");

    const query: any = {};

    if (name) {
      query.name = name;
    } else if (email) {
      query.email = email;
    } else {
      throw new Error("no query");
    }

    const existing = await this.userModel.findOne(query);

    if (existing && !existing.isDeleted) {
      await this.userModel.updateOne(query, {
        $set: {
          isDeleted: true
        }
      });

      return 1;
    }

    return 0;
  }
}
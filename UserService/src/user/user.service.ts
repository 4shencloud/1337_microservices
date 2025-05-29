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
      $set: {
        email,
        name
      }
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

  async deleteUser(_id: string | ObjectId): Promise<UserDocument | null> {
    this.logger.debug("deleteUser hit");

    const existing = await this.userModel.findById(_id);

    if (existing) {
      if (!existing.isDeleted) {
        await this.userModel.updateOne({ _id }, {
          $set: {
            isDeleted: true
          }
        });
        return existing;
      } else {
        return null;
      }
    }

    return null;
  }
}
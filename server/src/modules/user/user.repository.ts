import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery, QueryOptions } from "mongoose";
import { User } from "./user.schema";

@Injectable()
export class UserRepository {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async findOne(query: FilterQuery<User>, options?: QueryOptions): Promise<User | null> {
    return this.userModel.findOne(query, options).exec();
  }

  async updateOne(query: FilterQuery<User>, update: Partial<User>, options?: QueryOptions): Promise<User | null> {
    return this.userModel.findOneAndUpdate(query, update, { new: true, ...options }).exec();
  }
}

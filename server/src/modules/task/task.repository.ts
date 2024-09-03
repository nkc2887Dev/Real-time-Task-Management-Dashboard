import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./task.schema";
import { Model } from "mongoose";

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}
  async create(data) {
    return this.taskModel.create(data);
  }
}

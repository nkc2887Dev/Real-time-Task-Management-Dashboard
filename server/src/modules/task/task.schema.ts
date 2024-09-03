import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum } from "class-validator";
import { Document, Types } from "mongoose";
import { TASK_STATUS } from "./task.enum";
import mongoosePaginate from "mongoose-paginate-v2";
import idValidator from "mongoose-id-validator";
import { BaseSchema } from "src/utils/common.schema";

export type TaskDocument = Task & Document;

@Schema()
export class Task extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop({})
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  assignees: Types.ObjectId[];

  @Prop({ enum: TASK_STATUS, default: TASK_STATUS.TODO })
  @IsEnum(TASK_STATUS)
  status: string;

  @Prop({ default: false })
  subTask: boolean;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: true })
  canDel: boolean;
}

const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.pre(["find", "findOne"], function (next) {
  this.where({ deletedAt: { $exists: false }, deletedBy: { $exists: false } });
  next();
});

TaskSchema.plugin(mongoosePaginate);
TaskSchema.plugin(idValidator);

export { TaskSchema };

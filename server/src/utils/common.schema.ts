import { Prop } from "@nestjs/mongoose";
import { Types } from "mongoose";

export abstract class BaseSchema {
  @Prop({ type: Types.ObjectId, ref: "User" })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "User" })
  updatedBy?: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: "User", nullable: true })
  deletedBy?: Types.ObjectId;
}

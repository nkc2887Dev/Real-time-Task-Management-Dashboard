import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import idValidator from "mongoose-id-validator";

@Schema()
export class Role extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ default: false })
  canDel: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.pre(["find", "findOne"], function (next) {
  this.where({ deletedAt: { $exists: false }, deletedBy: { $exists: false } });
  next();
});

RoleSchema.plugin(mongoosePaginate);
RoleSchema.plugin(idValidator);

export { RoleSchema };

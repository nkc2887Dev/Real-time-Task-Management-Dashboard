import { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  { versionKey: false },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Pre hooks to exclude soft-deleted documents
UserSchema.pre(["find", "findOne"], function (next) {
  this.where({ deletedAt: { $exists: false }, deletedBy: { $exists: false } });
  next();
});

// Method to compare the entered password with the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

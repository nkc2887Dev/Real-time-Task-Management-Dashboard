import { Injectable, Logger } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUser.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CommonService } from "src/utils/common";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private readonly commonService: CommonService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userModel.create(data);
  }

  async loginUser(data: LoginUserDto): Promise<object | any> {
    try {
      const { email, password } = data;
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) return { flag: false, msg: "User not found." };
      const matchedPass = await user.matchPassword(password);
      if (!matchedPass) {
        return { flag: false, msg: "Password not match." };
      }
      const token = await this.commonService.generateToken(user);
      await this.userModel.findOneAndUpdate({ _id: user._id }, { $set: { token } }, { new: true });
      return { flag: true, token };
    } catch (error) {
      this.logger.error(`Error - loginuser : `, error);
      throw error;
    }
  }
}

// 8595849995

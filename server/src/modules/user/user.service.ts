import { Injectable, Logger } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUser.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CommonService } from "src/utils/common";
import { IUserList } from "src/@types/user";
import { DBService } from "src/utils/dbservice";
import { PaginatedResponse } from "src/@types/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private readonly userRepository: UserRepository,
    private readonly commonService: CommonService,
    private readonly dbService: DBService,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findOne({ _id: id }, { select: "-token -password" });
  }

  async userList(data: IUserList): Promise<PaginatedResponse<User>> {
    let { query, options } = data;
    if (data?.options) {
      options = {
        ...data.options,
      };
      options.sort = data?.options?.sort ? data?.options?.sort : { createdAt: -1 };
      options.select = "-token -password";
    }
    if (data?.query) {
      query = {
        ...data.query,
      };
    }
    const users = (await this.dbService.getAllDocuments(this.userModel, query, options)) as PaginatedResponse<User>;
    return users;
  }

  async loginUser(data: LoginUserDto): Promise<object | any> {
    try {
      const { email, password } = data;
      const user = await this.userRepository.findOne({ email });
      if (!user) return { flag: false, msg: "User not found." };
      const matchedPass = await user.matchPassword(password);
      if (!matchedPass) {
        return { flag: false, msg: "Password not match." };
      }
      const token = await this.commonService.generateToken(user);
      await this.userRepository.updateOne({ _id: user._id }, { token });
      return { flag: true, token };
    } catch (error) {
      this.logger.error(`Error - loginUser : `, error);
      throw error;
    }
  }
}

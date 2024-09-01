import { Body, Controller, Get, HttpStatus, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { UserService } from "./user.service";
import { ResponseBuilder } from "src/utils/response-builder";
import { Request, Response } from "express";
import { IUserList } from "src/@types/user";
import { AuthGuard } from "src/helpers/autharisation";

@Controller("users")
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly responseBuilder: ResponseBuilder,
  ) {}

  @Post("/register")
  async register(@Body() bodyData: CreateUserDto, @Res() response: Response) {
    try {
      const result = await this.userService.createUser(bodyData);
      return this.responseBuilder.responseMessage(true, "User created successfully", HttpStatus.OK, result, response);
    } catch (error) {
      this.logger.error(error);
      return this.responseBuilder.responseMessage(
        false,
        "User created Unsuccessfully",
        HttpStatus.BAD_REQUEST,
        { error: error.message },
        response,
      );
    }
  };

  @Post("/login")
  async login(@Body() bodyData: LoginUserDto, @Res() response: Response) {
    try {
      const result = await this.userService.loginUser(bodyData);
      if (!result.flag) {
        return this.responseBuilder.responseMessage(false, result.msg, HttpStatus.BAD_REQUEST, {}, response);
      }
      return this.responseBuilder.responseMessage(true, "User login successfully", HttpStatus.OK, result, response);
    } catch (error) {
      this.logger.error(error);
      return this.responseBuilder.responseMessage(
        false,
        "User login Unsuccessfully",
        HttpStatus.BAD_REQUEST,
        { error: error.message },
        response,
      );
    }
  };

  @Post("/list")
  @UseGuards(AuthGuard)
  async list(@Body() bodyData: IUserList, @Res() response: Response, @Req() req) {
    try {
      const result = await this.userService.userList(bodyData);
      return this.responseBuilder.responseMessage(true, "All Users fetched successfully", HttpStatus.OK, result, response);
    } catch (error) {
      this.logger.error(error);
      return this.responseBuilder.responseMessage(
        false,
        "User list failed",
        HttpStatus.BAD_REQUEST,
        { error: error.message },
        response,
      );
    }
  }
}

import { Body, Controller, Delete, Get, HttpStatus, Logger, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ErrorCode } from "src/utils/error.codes";
import { ResponseBuilder } from "src/utils/response-builder";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(
    private readonly responseBuilder: ResponseBuilder,
    private readonly taskService: TaskService,
  ) {}

  @Post("/create")
  async createTask(@Body() bodyData, @Res() response: Response) {
    try {
      const result = await this.taskService.createTask(bodyData);
      return this.responseBuilder.responseMessage(true, "Successfully create task", HttpStatus.OK, response, result);
    } catch (error) {
      this.logger.error(error);
      return this.responseBuilder.responseMessage(false, "Unable to create task", HttpStatus.BAD_REQUEST, response, {
        code: ErrorCode.DB_REQUEST_FAILED,
        message: error.message,
        detail: error.detail,
      });
    }
  }

  @Get("/:id")
  async getTask() {}

  @Put("/:id")
  async updateTask() {}

  @Post("/list")
  async taskList() {}

  @Delete("/id")
  async deleteTask() {}
}

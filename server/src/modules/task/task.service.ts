import { Injectable, Logger } from "@nestjs/common";
import { TaskRepository } from "./task.repository";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly taskRepository: TaskRepository) {}
  async createTask(data) {
    try {
      return this.taskRepository.create(data);
    } catch (error) {
      this.logger.error(`Error - createTask : `, error);
      throw error;
    }
  }
}

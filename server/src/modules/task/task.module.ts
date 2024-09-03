import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import configuration from "src/config/configuration";
import { ResponseBuilder } from "src/utils/response-builder";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { CommonService } from "src/utils/common";
import { DBService } from "src/utils/dbservice";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { TaskRepository } from "./task.repository";
import { Task, TaskSchema } from "./task.schema";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, ResponseBuilder, CommonService, ConfigService, DBService],
})
export class TaskModule {
  constructor(private configService: ConfigService) {
    const myCustomLabels = this.configService.get("MYCUSTOMLABELS");
    (mongoosePaginate as any).paginate.options = {
      customLabels: myCustomLabels,
    };
  }
}

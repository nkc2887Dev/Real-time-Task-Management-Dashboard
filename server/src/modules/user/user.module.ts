import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ResponseBuilder } from "src/utils/response-builder";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CommonService } from "src/utils/common";
import configuration from "src/config/configuration";
import { DBService } from "src/utils/dbservice";
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, ResponseBuilder, CommonService, ConfigService, DBService],
})
export class UserModule {
    constructor(private configService: ConfigService) {
      const myCustomLabels = this.configService.get('MYCUSTOMLABELS');
      (mongoosePaginate as any).paginate.options = {
        customLabels: myCustomLabels,
      };
    }
  }
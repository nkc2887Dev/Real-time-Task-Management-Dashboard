import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { RoleModule } from "./modules/role/role.module";
import { TaskModule } from "./modules/task/task.module";
import { config as configDotenv } from "dotenv";
configDotenv();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbHost = configService.get<string>("database.DB_HOST");
        const dbPort = configService.get<string>("database.DB_PORT");
        const dbDatabase = configService.get<string>("database.DB_DATABASE");
        const dbUsername = configService.get<string>("database.DB_USERNAME");
        const dbPassword = configService.get<string>("database.DB_PASSWORD");

        let uri = process.env.DB_URL;
        // let uri = `mongodb://${dbHost}:${dbPort}/${dbDatabase}`;
        // if (dbUsername && dbPassword) {
        //   uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
        // }
        return { uri };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

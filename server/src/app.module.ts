import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./config/configuration";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";

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

        let uri = `mongodb://${dbHost}:${dbPort}/${dbDatabase}`;
        if (dbUsername && dbPassword) {
          uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
        }
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

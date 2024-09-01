import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load:[configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbHost = configService.get<string>('database.DB_HOST');
        const dbPort = configService.get<string>('database.DB_PORT');
        const dbDatabase = configService.get<string>('database.DB_DATABASE');
        const dbUsername = configService.get<string>('database.DB_USERNAME');
        const dbPassword = configService.get<string>('database.DB_PASSWORD');
        
        let uri = `mongodb://${dbHost}:${dbPort}/${dbDatabase}`;
        if (dbUsername && dbPassword) {
          uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
        }
        return { uri };
      },
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

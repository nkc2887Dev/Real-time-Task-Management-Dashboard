import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./utils/transform.interceptors";
import { LoggerMiddleware } from "./utils/logger";
import { InitSeed } from "./seeder";
import { SeedService } from "./seeder/service";

async function bootstrap() {
  const port = 7984;
  const app = await NestFactory.create(AppModule);

  app.use(LoggerMiddleware);
  const seedService = app.get(SeedService);
  const seeds = new InitSeed(seedService)
  
  app.enableCors();
  app.setGlobalPrefix("api/v1");
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await seeds.onModuleInit();
  await app.listen(port);
  console.info(`server listen on : ${port}`);
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport,  } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
    transport: Transport.REDIS,
    options:{
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    }
  });
  await app.listen()
}

bootstrap();

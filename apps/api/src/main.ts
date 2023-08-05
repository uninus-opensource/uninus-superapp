/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MasterApi } from "@uninus/api/master";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(MasterApi);
  const globalPrefix = "api";
  const url = process.env.CORS_ORIGIN;
  const origin = url.includes(",") ? url.split(",") : url;
  app.enableCors({
    origin,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  });
  app.setGlobalPrefix(globalPrefix);
  app.use(
    bodyParser.json({
      limit: "10mb",
    }),
  );
  app.use(
    bodyParser.urlencoded({
      limit: "10mb",
      extended: true,
    }),
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle("UNINUS API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

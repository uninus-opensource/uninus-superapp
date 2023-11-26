/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import "reflect-metadata";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MasterApi } from "@uninus/api/modules";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { RpcExceptionToHttpExceptionFilter } from "@uninus/api/filters";

async function bootstrap() {
  const app = await NestFactory.create(MasterApi);
  const globalPrefix = "api";
  const url = process.env.CORS_ORIGIN;
  const origin = url.includes(",") ? url.split(",") : url;
  app.enableCors({
    origin,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
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
  app.useGlobalFilters(new RpcExceptionToHttpExceptionFilter());
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle("UNINUS API")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "basic",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "basic",
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "bearer",
    )
    .addGlobalParameters({
      in: "header",
      required: false,
      name: "app-origin",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 4215;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();

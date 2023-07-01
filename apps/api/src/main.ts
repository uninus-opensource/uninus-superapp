/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MasterApi } from '@uninus/master-api';

async function bootstrap() {
  const app = await NestFactory.create(MasterApi);
  const globalPrefix = 'api';
  app.enableCors({
    origin: ['http://localhost:4200', 'https://pmb.votsu.co'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  });
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

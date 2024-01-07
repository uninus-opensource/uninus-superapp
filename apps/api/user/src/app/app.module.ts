import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "@uninus/api/modules";

@Module({
  imports: [DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { DrizzleModule } from "@uninus/api/modules";

@Module({
  imports: [DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

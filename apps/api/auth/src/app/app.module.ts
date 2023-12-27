import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { PrismaModule, DrizzleModule } from "@uninus/api/modules";

@Module({
  imports: [PrismaModule, DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

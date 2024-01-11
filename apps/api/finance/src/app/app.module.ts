import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { DrizzleModule } from "@uninus/api/modules";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true }), DrizzleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

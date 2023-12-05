import { Module } from "@nestjs/common";
import { PMBController } from "./app.controller";
import { PMBService } from "./app.service";

@Module({
  imports: [],
  controllers: [PMBController],
  providers: [PMBService],
})
export class PMBModule {}

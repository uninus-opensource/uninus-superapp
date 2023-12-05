import { Module } from "@nestjs/common";
import { CollegeController } from "./app.controller";
import { CollegeService } from "./app.service";

@Module({
  imports: [],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}

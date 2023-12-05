import { Module } from "@nestjs/common";
import { PersonalController } from "./app.controller";
import { PersonalService } from "./app.service";

@Module({
  imports: [],
  controllers: [PersonalController],
  providers: [PersonalService],
})
export class PersonalModule {}

import { Module } from "@nestjs/common";
import { PMBModule } from "../pmb/app.module";
import { PersonalModule } from "../personal/app.module";
import { DrizzleModule } from "@uninus/api/modules";
import { CollegeModule } from "../college/app.module";

@Module({
  imports: [PMBModule, PersonalModule, CollegeModule, DrizzleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

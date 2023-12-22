import { Module } from "@nestjs/common";
import { PMBModule } from "../pmb/app.module";
import { PersonalModule } from "../personal/app.module";
import { PrismaModule, DrizzleModule } from "@uninus/api/modules";
import { CollegeModule } from "../college/app.module";

@Module({
  imports: [PrismaModule, PMBModule, PersonalModule, CollegeModule, DrizzleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

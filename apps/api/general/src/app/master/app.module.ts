import { Module } from "@nestjs/common";
import { PMBModule } from "../pmb/app.module";
import { PersonalModule } from "../personal/app.module";
import { PrismaModule } from "@uninus/api/modules";

@Module({
  imports: [PrismaModule, PMBModule, PersonalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

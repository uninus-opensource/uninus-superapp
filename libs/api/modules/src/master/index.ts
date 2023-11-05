import { Module } from "@nestjs/common";
import { AuthModule } from "../auth";
import { StudentModule } from "../student";
import { UserModule } from "../user";
import { GeneralModule } from "../general";
import { FileModule } from "../file";
import { EmployeeModule } from "../employee";
import { FinanceModule } from "../finance";

@Module({
  imports: [
    AuthModule,
    StudentModule,
    UserModule,
    GeneralModule,
    FileModule,
    EmployeeModule,
    FinanceModule,
  ],
  controllers: [],
  providers: [],
})
export class MasterApi {}

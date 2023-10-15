import { Module } from "@nestjs/common";
import { PrismaModule } from "@uninus/api/modules";
import {
  AuthModule,
  GeneralModule,
  StudentModule,
  UserModule,
  FileModule,
  EmployeeModule,
  FinanceModule,
} from "@uninus/api/modules";

@Module({
  imports: [
    PrismaModule,
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

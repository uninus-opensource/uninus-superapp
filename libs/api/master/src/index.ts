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
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    PrismaModule,
    HttpModule,
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

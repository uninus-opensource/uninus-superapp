import { Module } from "@nestjs/common";
import { PrismaModule } from "@uninus/api/models";
import {
  AuthModule,
  GeneralModule,
  StudentModule,
  UserModule,
  FileModule,
  EmployeeModule,
  PaymentModule
} from "@uninus/api/modules";

@Module({
  imports: [PrismaModule, AuthModule, StudentModule, UserModule, GeneralModule, FileModule, EmployeeModule,PaymentModule],
  controllers: [],
  providers: [],
})
export class MasterApi {}

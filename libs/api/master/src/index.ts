import { Module } from "@nestjs/common";
import { PrismaModule } from "@uninus/api/models";
import {
  AuthModule,
  GeneralModule,
  StudentModule,
  UserModule,
  FileModule,
} from "@uninus/api/modules";

@Module({
  imports: [PrismaModule, AuthModule, StudentModule, UserModule, GeneralModule, FileModule],
  controllers: [],
  providers: [],
})
export class MasterApi {}

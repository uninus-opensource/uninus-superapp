import { Module } from "@nestjs/common";
import { AuthModule } from "../auth";
import { StudentModule } from "../student";
import { UserModule } from "../user";
import { GeneralModule } from "../general";
import { FileModule } from "../file";
import { EmployeeModule } from "../employee";
import { FinanceModule } from "../finance";
import { JwtStrategy, RtStrategy } from "@uninus/api/strategies";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    AuthModule,
    StudentModule,
    UserModule,
    GeneralModule,
    FileModule,
    EmployeeModule,
    FinanceModule,
  ],
  controllers: [],
  providers: [JwtStrategy, RtStrategy],
})
export class MasterApi {}

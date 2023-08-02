import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "@uninus/api/controllers";
import { JwtStrategy, RtStrategy } from "@uninus/api/strategies";
import { PrismaModule } from "@uninus/api/models";
import { AuthService, EmailService } from "@uninus/api/services";
import { EmailModule } from "../email";
import { PmbModule } from "../pmb";

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),

    PmbModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RtStrategy, EmailService],
})
export class AuthModule {}

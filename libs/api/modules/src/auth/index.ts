import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "@uninus/api/controllers";
import { JwtStrategy, RtStrategy } from "@uninus/api/strategies";
import { PrismaModule } from "@uninus/api/models";
import { AuthService, EmailService } from "@uninus/api/services";
import { EmailModule } from "../email";
import { PmbModule } from "../pmb";
import { ClientsModule, Transport } from "@nestjs/microservices";
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
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.REDIS,
        options:{
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
        }
      }
    ]),

    PmbModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RtStrategy, EmailService],
})
export class AuthModule {}

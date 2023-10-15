import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "@uninus/api/controllers";
import { JwtStrategy, RtStrategy } from "@uninus/api/strategies";
import { PrismaModule } from "../prisma";
import { AuthService } from "@uninus/api/services";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: "1h" },
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    ClientsModule.register([
      {
        name: "REDIS_SERVICE",
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT),
          password: process.env.REDIS_PASSWORD,
          username: process.env.REDIS_USERNAME,
          retryAttempts: 3,
          retryDelay: 2000,
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RtStrategy],
})
export class AuthModule {}

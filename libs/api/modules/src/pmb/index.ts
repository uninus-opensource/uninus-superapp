import { Module } from "@nestjs/common";
import { UserController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { EmailService, UserService } from "@uninus/api/services";
import { EmailModule } from "../email";

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [UserController],
  providers: [UserService, EmailService],
})
export class PmbModule {}

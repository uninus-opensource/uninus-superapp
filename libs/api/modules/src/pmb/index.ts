import { Module } from "@nestjs/common";
import { UserController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { CloudinaryService, EmailService, UserService } from "@uninus/api/services";
import { CloudinaryModule } from "../cloudinary";
import { EmailModule } from "../email";
import { FileModule } from "../file";

@Module({
  imports: [PrismaModule, EmailModule, CloudinaryModule, FileModule],
  controllers: [UserController],
  providers: [UserService, EmailService, CloudinaryService],
})
export class PmbModule {}

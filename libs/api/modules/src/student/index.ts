import { Module } from "@nestjs/common";
import { StudentController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { CloudinaryService, StudentService } from "@uninus/api/services";
import { CloudinaryModule } from "../cloudinary";

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [StudentController],
  providers: [StudentService, CloudinaryService],
})
export class StudentModule {}

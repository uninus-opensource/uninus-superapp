import { Module } from "@nestjs/common";
import { StudentController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { StudentService } from "@uninus/api/services";

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

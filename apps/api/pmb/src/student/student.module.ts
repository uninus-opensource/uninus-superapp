import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { CloudinaryModule } from '@uninus/api/modules';
import { PrismaModule } from '@uninus/api/models';
import { CloudinaryService } from '@uninus/api/services';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [StudentController],
  providers: [StudentService, CloudinaryService],
})
export class StudentModule {}

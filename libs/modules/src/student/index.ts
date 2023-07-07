import { Module } from '@nestjs/common';
import { StudentController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { CloudinaryService, StudentService } from '@uninus/services';
import { CloudinaryModule } from '../cloudinary';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [StudentController],
  providers: [StudentService, CloudinaryService],
})
export class StudentModule {}

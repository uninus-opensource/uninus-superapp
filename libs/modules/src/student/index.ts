import { Module } from '@nestjs/common';
import { StudentController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { StudentService } from '@uninus/services';

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

import { Module } from '@nestjs/common';
import { StudentController } from '@uninus/controllers';
import { StudentService } from '@uninus/services';
import { PrismaModule } from '../prisma/index';

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

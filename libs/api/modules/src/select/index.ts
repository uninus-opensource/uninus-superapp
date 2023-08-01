import { Module } from '@nestjs/common';
import { SelectController } from '@uninus/api/controllers';
import { PrismaModule } from '@uninus/api/models';
import { SelectService } from '@uninus/api/services';

@Module({
  imports: [PrismaModule],
  controllers: [SelectController],
  providers: [SelectService],
})
export class SelectModule {}

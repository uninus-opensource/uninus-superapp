import { Module } from '@nestjs/common';
import { LocationController } from '@uninus/controllers';
import { PrismaModule } from '@uninus/models';
import { LocationService } from '@uninus/services';
@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}

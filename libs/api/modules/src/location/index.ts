import { Module } from '@nestjs/common';
import { LocationController } from '@uninus/api/controllers';
import { PrismaModule } from '@uninus/api/models';
import { LocationService } from '@uninus/api/services';
@Module({
  imports: [PrismaModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}

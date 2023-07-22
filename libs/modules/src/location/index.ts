// src/location/location.module.ts
import { Module } from '@nestjs/common';
import { LocationController } from '@uninus/controllers';
import { LocationService, LocationApiService } from '@uninus/services';

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationApiService],
})
export class LocationModule {}

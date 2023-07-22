import { Controller, Get } from '@nestjs/common';
import { LocationService } from '@uninus/services';
import { Location } from '@uninus/entities';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('provinces')
  async getProvinces(): Promise<Location[]> {
    return this.locationService.getProvinces();
  }
}

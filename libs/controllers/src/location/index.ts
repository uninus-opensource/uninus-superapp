import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from '@uninus/services';
import { Location } from '@uninus/entities';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('provinces')
  async getProvinces(): Promise<Location[]> {
    return await this.locationService.getProvinces();
  }

  @Get('cities/:provinsi_id')
  async getCities(
    @Param('provinsi_id') provinsi_id: string
  ): Promise<Location[]> {
    return await this.locationService.getCities(provinsi_id);
  }

  @Get('district/:kota_id')
  async getDistrict(@Param('kota_id') kota_id: string): Promise<Location[]> {
    return this.locationService.getDistricts(kota_id);
  }
}

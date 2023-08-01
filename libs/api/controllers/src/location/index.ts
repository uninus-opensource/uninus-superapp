import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from '@uninus/api/services';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly appService: LocationService) {}

  @Get('province')
  @ApiOperation({ summary: 'Get Province' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getProvince(@Query('search') search: string) {
    return this.appService.getProvince({ search });
  }

  @Get('city')
  @ApiOperation({ summary: 'Get City' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getCity(
    @Query('province_id') province_id: string,
    @Query('search') search: string
  ) {
    return this.appService.getCity({ province_id, search });
  }

  @Get('sub-district')
  @ApiOperation({ summary: 'Get Sub District' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getSubDistrict(
    @Query('city_id') city_id: string,
    @Query('search') search: string
  ) {
    return this.appService.getSubDistrict({ city_id, search });
  }
}

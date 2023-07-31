import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from '@uninus/api/services';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly appService: LocationService) {}

  @Get()
  @ApiOperation({ summary: 'Get Data Location' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getData(@Query('province') province: string, @Query('city') city: string) {
    return this.appService.getLocation({ province, city });
  }
}

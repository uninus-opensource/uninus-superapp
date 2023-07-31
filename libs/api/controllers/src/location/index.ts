import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocationService } from '@uninus/api/services';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly appService: LocationService) {}

  // @Get()
  // @ApiOperation({ summary: 'Get Data Location' })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Lokasi tidak ditemukan',
  // })
  // getData(@Query('province') province: string, @Query('city') city: string) {
  //   return this.appService.getLocation({ province, city });
  // }

  @Get('province')
  @ApiOperation({ summary: 'Get Province' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getProvince() {
    return this.appService.getProvince();
  }

  @Get('city')
  @ApiOperation({ summary: 'Get City' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getCity(@Query('id') id: string) {
    return this.appService.getCity({ id });
  }

  @Get('sub-district')
  @ApiOperation({ summary: 'Get Sub District' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  getSubDistrict(@Query('id') id: string) {
    return this.appService.getSubDistrict({ id });
  }
}

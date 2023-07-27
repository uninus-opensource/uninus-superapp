import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard, TReqToken } from '@uninus/entities';
import { LocationService } from '@uninus/services';
import { Console } from 'console';

@Controller('location')
@ApiTags('Location')
export class LocationController {
  constructor(private readonly appService: LocationService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Data Location' })
  @ApiResponse({
    status: 400,
    description: 'Lokasi tidak ditemukan',
  })
  @UseGuards(JwtAuthGuard)
  getData(@Query('province') province: string, @Query('city') city: string) {
    return this.appService.getLocation(province, city);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Data Province' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  createData(
    @Request() reqToken: TReqToken,
    @Body('province') province: string
  ) {
    const { sub } = reqToken.user;
    return this.appService.createProvince(province);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  updateData(
    @Request() reqToken: TReqToken,
    @Param('id') id: string,
    @Body('province') province: string
  ) {
    const { sub } = reqToken.user;
    return this.appService.updateProvince(id, province);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Data Province' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  deleteData(@Request() reqToken: TReqToken, @Param('id') id: string) {
    const { sub } = reqToken.user;
    return this.appService.deleteProvince(id);
  }

  @Post('/city')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Data City' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  createCity(
    @Request() reqToken: TReqToken,
    @Body('city') city: string,
    @Body('province_id') province_id: number
  ) {
    const { sub } = reqToken.user;
    return this.appService.createCity(city, province_id);
  }

  @Put('/city/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  updateCity(
    @Request() reqToken: TReqToken,
    @Param('id') id: string,
    @Body('city') city: string
  ) {
    const { sub } = reqToken.user;
    return this.appService.updateCity(id, city);
  }

  @Delete('/city/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  deleteCity(@Request() reqToken: TReqToken, @Param('id') id: string) {
    const { sub } = reqToken.user;
    return this.appService.deleteCity(id);
  }

  @Post('/sub-district')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Data Sub District' })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  createSubDistrict(
    @Request() reqToken: TReqToken,
    @Body('sub_district') subDistrict: string,
    @Body('city_id') city_id: number
  ) {
    const { sub } = reqToken.user;
    return this.appService.createSubDistrict(subDistrict, city_id);
  }

  @Put('/sub-district/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  updateSubDistrict(
    @Request() reqToken: TReqToken,
    @Param('id') id: string,
    @Body('sub_district') subDistrict: string
  ) {
    const { sub } = reqToken.user;
    return this.appService.updateSubDistrict(id, subDistrict);
  }

  @Delete('/sub-district/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  deleteSubDistrict(@Request() reqToken: TReqToken, @Param('id') id: string) {
    const { sub } = reqToken.user;
    return this.appService.deleteSubDistrict(id);
  }
}

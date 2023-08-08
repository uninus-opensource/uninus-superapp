import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("get_country")
  getCountry(payload: { search: string }) {
    return this.appService.getCountry(payload);
  }

  @MessagePattern("get_subdistrict")
  getSubdistrict(payload: { city_id: string; search: string }) {
    return this.appService.getSubDistrict(payload);
  }

  @MessagePattern("get_city")
  getCity(payload: { province_id: string; search: string }) {
    return this.appService.getCity(payload);
  }

  @MessagePattern("get_province")
  getProvince(payload: { search: string }) {
    return this.appService.getProvince(payload);
  }
}

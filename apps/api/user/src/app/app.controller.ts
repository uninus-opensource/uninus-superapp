import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectRequest,
  IUserRequest,
  TCreateUserRequest,
  TIdUser,
  TUsersPaginationArgs,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("get_user")
  async getDatauser(payload: TIdUser) {
    return await this.appService.getDatauser(payload);
  }
  @MessagePattern("get_users")
  async getDataUsers(payload: TUsersPaginationArgs) {
    return await this.appService.getDataUsers(payload);
  }

  @MessagePattern("create_user")
  async createUser(payload: TCreateUserRequest) {
    return await this.appService.createUser(payload);
  }

  @MessagePattern("update_user")
  async updateDataUser(payload: IUserRequest) {
    return await this.appService.updateDataUser(payload);
  }

  @MessagePattern("delete_user")
  async deleteDataUser(payload: TIdUser) {
    return await this.appService.deleteDataUser(payload);
  }

  @MessagePattern("get_roles")
  async getRoles(payload: ISelectRequest) {
    return await this.appService.getRoles(payload);
  }
}

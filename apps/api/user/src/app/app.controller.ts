import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectRequest,
  IUserRequest,
  TCreateNotificationRequest,
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

  @MessagePattern("get_notification")
  async getNotification(payload: { id: string }) {
    return await this.appService.getNotification(payload);
  }

  @MessagePattern("create_notification")
  async createNotification(payload: TCreateNotificationRequest) {
    return await this.appService.createNotification(payload);
  }
  @MessagePattern("delete_notification")
  async deleteNotification(payload: { id: string }) {
    return await this.appService.deleteNotification(payload);
  }
}

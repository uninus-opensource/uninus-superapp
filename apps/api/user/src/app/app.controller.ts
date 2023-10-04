import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { IUserRequest, TCreateUserRequest, TUsersPaginationArgs } from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("get_user")
  async getUser(id: string) {
    return await this.appService.getUser(id);
  }
  @MessagePattern("get_users")
  async getUsers({ where, orderBy, page, perPage }: TUsersPaginationArgs) {
    return await this.appService.getUsers({ where, orderBy, page, perPage });
  }

  @MessagePattern("create_user")
  async createUser(payload: TCreateUserRequest) {
    return await this.appService.createUser(payload);
  }

  @MessagePattern("update_user")
  async updateUser(payload: IUserRequest) {
    return await this.appService.updateUser(payload);
  }

  @MessagePattern("delete_user")
  async deleteUser(id: string) {
    return await this.appService.deleteUser(id);
  }
}

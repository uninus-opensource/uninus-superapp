import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { IUserRequest, TUsersPaginationArgs } from "@uninus/entities";
import { Prisma } from "@prisma/client";

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
  async createUser(payload: Prisma.UsersCreateInput) {
    return await this.appService.createUser(payload);
  }

  @MessagePattern("update_user")
  async updateUser(data: { id: string; payload: IUserRequest }) {
    const payload = data.payload;
    const id = data.id;
    return await this.appService.updateUser(id, payload);
  }

  @MessagePattern("delete_user")
  async deleteUser(id: string) {
    return await this.appService.deleteUser(id);
  }
}

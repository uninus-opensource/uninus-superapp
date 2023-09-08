import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import { IUserRequest, TPaginationArgs } from "@uninus/entities";
import { Prisma } from "@prisma/client";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("get_user")
  getUser(id: string) {
    return this.appService.getUser(id);
  }
  @MessagePattern("get_users")
  getUsers({ where, orderBy, page, perPage }: TPaginationArgs) {
    return this.appService.getUsers({ where, orderBy, page, perPage });
  }

  @MessagePattern("create_user")
  createUser(payload: Prisma.UsersCreateInput) {
    return this.appService.createUser(payload);
  }

  @MessagePattern("update_user")
  updateUser(data: { id: string; payload: IUserRequest }) {
    const payload = data.payload;
    const id = data.id;
    return this.appService.updateUser(id, payload);
  }

  @MessagePattern("delete_user")
  deleteUser(id: string) {
    return this.appService.deleteUser(id);
  }
}

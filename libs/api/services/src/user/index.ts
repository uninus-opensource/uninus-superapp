import { Inject, Injectable } from "@nestjs/common";
import {
  TProfileResponse,
  TCreateUserRequest,
  TCreateUserResponse,
  TUpdateUserRequest,
  TUpdateUserResponse,
  TUsersPaginationArgs,
  TUsersPaginatonResponse,
  TIdUser,
} from "@uninus/entities";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class UserService {
  constructor(@Inject("USER_SERVICE") private readonly client: ClientProxy) {}

  async getDataUser(payload: TIdUser): Promise<TProfileResponse> {
    const response = await firstValueFrom(
      this.client
        .send<TProfileResponse>("get_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDataUsers(payload: TUsersPaginationArgs): Promise<TUsersPaginatonResponse> {
    const response = await firstValueFrom(
      this.client
        .send("get_users", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDataUserById(payload: TIdUser): Promise<TProfileResponse> {
    const response = await firstValueFrom(
      this.client
        .send<TProfileResponse>("get_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteDataUser(payload: TIdUser) {
    const response = await firstValueFrom(
      this.client
        .send("delete_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateUser(payload: TUpdateUserRequest & TIdUser): Promise<TUpdateUserResponse> {
    const response = await firstValueFrom(
      this.client
        .send("update_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateUserById(payload: TUpdateUserRequest & TIdUser): Promise<TUpdateUserResponse> {
    return this.updateUser(payload);
  }

  async createUser(payload: TCreateUserRequest): Promise<TCreateUserResponse> {
    const response = await firstValueFrom(
      this.client
        .send("create_user", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getRoles(payload: { search: string; id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_roles", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}

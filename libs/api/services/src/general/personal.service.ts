import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import {
  ICityRequest,
  ICountryRequest,
  IEducationMajorRequest,
  IEducationTypeRequest,
  ISelectEducationHistoryRequest,
  ISelectRequest,
  ISubDistrictRequest,
  TCreateEducationRequest,
  TDeleteEducationRequest,
  TUpdateEducationRequest,
} from "@uninus/entities";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class PersonalService {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}

  async getProvince(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_province", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCity(payload: ICityRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_city", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getSubdistrict(payload: ISubDistrictRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_subdistrict", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getReligion(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_religion", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getMaritalStatus(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_marital_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getGender(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_gender", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCitizenship(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_citizenship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getSalary(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_salary", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCountry(payload: ICountryRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_country", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getOccupation(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_occupation", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDisablities(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_dissabilities", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
  async getYearGraduate() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 40;

    const year = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      const id = index + 1;
      return { id: +id, name: year };
    });

    return { year };
  }

  async getParentStatus(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_parent_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getParentEducation(payload: ISelectRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_parent_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLastEducation(payload: ISelectEducationHistoryRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_last_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLastEducationType(payload: IEducationTypeRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_last_education_type", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLastEducationMajor(payload: IEducationMajorRequest) {
    const response = await firstValueFrom(
      this.client
        .send("get_last_education_major", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createLastEducation(payload: TCreateEducationRequest) {
    const response = await firstValueFrom(
      this.client
        .send("create_last_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateLastEducation(payload: TUpdateEducationRequest) {
    const response = await firstValueFrom(
      this.client
        .send("update_last_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteLastEducation(payload: TDeleteEducationRequest) {
    const response = await firstValueFrom(
      this.client
        .send("delete_last_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}

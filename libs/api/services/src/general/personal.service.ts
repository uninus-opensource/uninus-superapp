import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateEducation } from "@uninus/api/dto";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Injectable()
export class PersonalService {
  constructor(@Inject("GENERAL_SERVICE") private readonly client: ClientProxy) {}

  async getProvince(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_province", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCity(payload: { search: string; province_id: string; id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_city", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getSubdistrict(payload: { search: string; city_id: string; id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_subdistrict", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getReligion(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_religion", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getMaritalStatus(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_marital_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getGender(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_gender", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCitizenship(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_citizenship", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getSalary(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_salary", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getCountry(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_country", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getOccupation(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_occupation", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getDisablities(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_dissabilities", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
  async getYearGraduate() {
    const response = await firstValueFrom(
      this.client
        .send("get_year_graduate", {})
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getParentStatus(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_parent_status", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getParentEducation(payload: { search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_parent_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLastEducation(payload: { search: string; npsn: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_education_history", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLastEducationType(payload: { degree_program_id: number; search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_education_type", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async getLastEducationMajor(payload: { education_type_id: number; search: string }) {
    const response = await firstValueFrom(
      this.client
        .send("get_education_major", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async createLastEducation(payload: CreateEducation) {
    const response = await firstValueFrom(
      this.client
        .send("create_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async updateLastEducation(payload: CreateEducation & { id: string }) {
    const response = await firstValueFrom(
      this.client
        .send("update_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }

  async deleteLastEducation(payload: { id: string; npsn: string }) {
    const response = await firstValueFrom(
      this.client
        .send("delete_education", payload)
        .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
    );
    return response;
  }
}

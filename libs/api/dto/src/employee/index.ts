import { ApiProperty } from "@nestjs/swagger";
import { EOrderByPagination } from "@uninus/entities";

export class GetEmployeesDto {
  @ApiProperty({ required: false })
  public page?: number;

  @ApiProperty({ required: false })
  public perPage?: number;

  @ApiProperty({ required: false, enum: EOrderByPagination })
  public orderBy?: [];

  @ApiProperty({ required: false })
  public filterBy?: string;

  @ApiProperty({ required: false })
  public search?: string;

  @ApiProperty({ required: true })
  public type!: number;
}

export class GetEmployeeParamsDto {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: false })
  public search?: string;
}

export class CreateEmployeeDto {
  @ApiProperty({ required: true })
  public fullname!: string;

  @ApiProperty({ required: true, minLength: 16 })
  public nik!: string;

  @ApiProperty({ required: false })
  public nip?: string;

  @ApiProperty({ required: false })
  public phoneNumber!: string;

  @ApiProperty({ required: true })
  public email!: string;

  @ApiProperty({ required: true })
  public workUnitCategoryId!: number;

  @ApiProperty({ required: true })
  public workUnitId!: number;

  @ApiProperty({ required: true })
  public employeeTypeId!: number;
}

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

export class GetTotalEmployeeDto {
  @ApiProperty({ required: false })
  public category?: number;
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
  public phone_number!: string;

  @ApiProperty({ required: true })
  public email!: string;

  @ApiProperty({ required: true })
  public work_unit_category_id!: number;

  @ApiProperty({ required: true })
  public work_unit_id!: number;

  @ApiProperty({ required: true })
  public employee_type_id!: number;
}

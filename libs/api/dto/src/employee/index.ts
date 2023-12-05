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

  @ApiProperty({ required: false })
  public type!: number;
}

export class GetEmployeeCategoriesDto {
  @ApiProperty({ required: false })
  public id?: number;

  @ApiProperty({ required: false })
  public search?: number;
}

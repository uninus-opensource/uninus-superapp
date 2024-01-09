import { ApiProperty } from "@nestjs/swagger";

export class UpdateStudentDto {
  @ApiProperty()
  avatar!: string;

  @ApiProperty()
  fullname!: string;

  @ApiProperty()
  nik!: string;

  @ApiProperty()
  nisn!: string;

  @ApiProperty()
  no_kk!: string;

  @ApiProperty()
  genderId!: number;

  @ApiProperty()
  relogionId!: number;

  @ApiProperty()
  birthPlace!: string;

  @ApiProperty()
  birthDate!: string;

  @ApiProperty()
  phoneNumber!: string;

  @ApiProperty()
  citizenshipId!: number;

  @ApiProperty()
  maritalStatusId!: number;

  @ApiProperty()
  countryId!: number;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  subdistrictId!: number;

  @ApiProperty()
  provinceId!: number;

  @ApiProperty()
  cityId!: number;

  @ApiProperty()
  educationTypeId!: number;

  @ApiProperty()
  educationMajorId!: number;

  @ApiProperty()
  graduationYear!: string;

  @ApiProperty()
  educationNpsn!: string;

  @ApiProperty()
  companyName!: string;

  @ApiProperty()
  companyAddress!: string;

  @ApiProperty()
  occupationId!: number;

  @ApiProperty()
  position!: string;

  @ApiProperty()
  salaryId!: number;

  @ApiProperty()
  guardianLecturerId!: string;

  @ApiProperty()
  fatherName!: string;

  @ApiProperty()
  fatherStatusId!: number;

  @ApiProperty()
  fatherEducationId!: number;

  @ApiProperty()
  fatherOccupationId!: number;

  @ApiProperty()
  fatherPosition!: string;

  @ApiProperty()
  fatherSalaryId!: number;

  @ApiProperty()
  motherName!: string;

  @ApiProperty()
  motherStatusId!: number;

  @ApiProperty()
  motherEducationId!: number;

  @ApiProperty()
  motherOccupationId!: number;

  @ApiProperty()
  motherPosition!: string;

  @ApiProperty()
  motherSalaryId!: number;

  @ApiProperty()
  guardianName!: string;

  @ApiProperty()
  guardianStatusId!: number;

  @ApiProperty()
  guardianEducationId!: number;

  @ApiProperty()
  guardianOccupationId!: number;

  @ApiProperty()
  guardianPosition!: string;

  @ApiProperty()
  guardianSalaryId!: number;

  @ApiProperty()
  parentProvinceId!: number;

  @ApiProperty()
  parentSubdistrictId!: number;

  @ApiProperty()
  parentSityId!: number;

  @ApiProperty()
  parentAddress!: string;

  @ApiProperty()
  scholarshipId!: number;

  @ApiProperty()
  disabilitiesId!: number;

  @ApiProperty()
  facultyId!: number;

  @ApiProperty()
  departmentId!: number;

  @ApiProperty()
  academicYear!: string;

  @ApiProperty()
  degreeProgramId!: number;

  @ApiProperty()
  firstDepartmentId!: number;

  @ApiProperty()
  secondDepartmentId!: number;

  @ApiProperty()
  selectionPathId!: number;

  @ApiProperty()
  registrationPathId!: number;

  @ApiProperty()
  utbkAverage!: number;

  @ApiProperty()
  utbkPu!: number;

  @ApiProperty()
  utbkKk!: number;

  @ApiProperty()
  utbkPpu!: number;

  @ApiProperty()
  utbkKmbm!: number;

  @ApiProperty({
    example: {
      name: "kk",
      path: "https://uninus.s3.ap-southeast-1.amazonaws.com/169393489551WhatsAp-Image-2023-08-31-a-20.10.31.jpeg",
    },
  })
  document!: object;

  @ApiProperty({
    isArray: true,
    example: [
      {
        name: "kk",
        path: "https://uninus.s3.ap-southeast-1.amazonaws.com/169393489551WhatsAp-Image-2023-08-31-a-20.10.31.jpeg",
      },
      {
        id: "04422755-dafb-46e1-aeeb-1aec363c9af2",
        isVerified: true,
      },
    ],
  })
  documents!: [];

  @ApiProperty({
    isArray: true,
    example: [
      {
        subject: "matematika",
        semester: "1",
        grade: 90,
      },
    ],
  })
  studentGrade!: [];

  @ApiProperty()
  registrationStatusId!: number;
}

export class CreateStudentDto extends UpdateStudentDto {
  @ApiProperty()
  email!: string;
}

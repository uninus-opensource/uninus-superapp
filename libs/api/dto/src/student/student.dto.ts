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
  kk!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  genderId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  logionId!: string;

  @ApiProperty()
  birthPlace!: string;

  @ApiProperty()
  birthDate!: string;

  @ApiProperty()
  phoneNumber!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  citizenshipId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  maritalStatusId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  countryId!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  subdistrictId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  provinceId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  cityId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  educationTypeId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  educationMajorId!: string;

  @ApiProperty()
  graduationYear!: string;

  @ApiProperty()
  educationNpsn!: string;

  @ApiProperty()
  companyName!: string;

  @ApiProperty()
  companyAddress!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  occupationId!: string;

  @ApiProperty()
  position!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  salaryId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  guardianLecturerId!: string;

  @ApiProperty()
  fatherName!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  fatherStatusId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  fatherEducationId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  fatherOccupationId!: string;

  @ApiProperty()
  fatherPosition!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  fatherSalaryId!: string;

  @ApiProperty()
  motherName!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  motherStatusId!: string;

  @ApiProperty()
  motherEducationId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  motherOccupationId!: string;

  @ApiProperty()
  motherPosition!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  motherSalaryId!: string;

  @ApiProperty()
  guardianName!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  guardianStatusId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  guardianEducationId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  guardianOccupationId!: string;

  @ApiProperty()
  guardianPosition!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  guardianSalaryId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  parentProvinceId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  parentSubdistrictId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  parentSityId!: string;

  @ApiProperty()
  parentAddress!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  scholarshipId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  disabilitiesId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  facultyId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  departmentId!: string;

  @ApiProperty()
  academicYear!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  degreeProgramId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  firstDepartmentId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  secondDepartmentId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  selectionPathId!: string;

  @ApiProperty({ required: false, type: "string", format: "uuid" })
  registrationPathId!: string;

  @ApiProperty()
  utbkAverage!: number;

  @ApiProperty()
  gradeAverage!: number;

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
  registrationStatusId!: string;
}

export class CreateStudentDto extends UpdateStudentDto {
  @ApiProperty()
  email!: string;
}

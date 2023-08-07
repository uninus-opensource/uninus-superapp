import { Test, TestingModule } from "@nestjs/testing";
import { StudentController } from "./";
import { StudentService, UpdateStudentSwagger } from "@uninus/api/services";
import { TFIle, TReqToken, EGender, ECitizenship, EReligion, EOccupation } from "@uninus/entities";

describe("StudentController", () => {
  let controller: StudentController;
  let mockStudentService: Partial<StudentService>;

  beforeEach(async () => {
    mockStudentService = {
      getStudent: jest.fn().mockResolvedValue({}),
      updateStudent: jest.fn().mockResolvedValue({}),
      deleteStudent: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{ provide: StudentService, useValue: mockStudentService }],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get student data", async () => {
    const reqToken: TReqToken = {
      user: {
        sub: "1",
        email: "",
        role: "",
      },
    };
    const result = await controller.getData(reqToken);
    expect(result).toBeDefined();
    expect(mockStudentService.getStudent).toHaveBeenCalledWith({ id: reqToken.user.sub });
  });

  it("should update student data", async () => {
    const reqToken: TReqToken = {
      user: {
        sub: "1",
        email: "",
        role: "",
      },
    };
    const avatar: TFIle = {
      fieldname: "",
      originalname: "",
      encoding: "",
      mimetype: "",
      size: 0,
      destination: "",
      filename: "",
      path: "",
      buffer: Buffer.alloc(0),
    };
    const studentData: UpdateStudentSwagger = {
      email: "example@gmail.com",
      fullname: "Test Student",
      nik: "1234567890123456",
      nisn: "1234567890",
      birth_place: "Test Place",
      birth_date: "2000-01-01",
      gender: EGender.MALE,
      phone_number: "1234567890",
      religion: EReligion.ISLAM,
      citizenship: ECitizenship.WNI,
      marital_status: "Single",
      country: "Indonesia",
      address: "123 Test Address",
      postal_code: "12345",
      subdistrict: "Test Subdistrict",
      province: "Test Province",
      city: "Test City",
      school_type: "Test Type",
      graduation_year: "2022",
      school_major: "Test Major",
      school_name: "Test School",
      school_npsm: "1234567890",
      school_address: "123 Test School Address",
      school_postal_code: "12345",
      school_subdistrict: "Test School Subdistrict",
      school_province: "Test School Province",
      school_city: "Test School City",
      school_phone_number: "1234567890",
      father_name: "Test Father",
      mother_name: "Test Mother",
      guardian_name: "Test Guardian",
      father_status: "Alive",
      mother_status: "Alive",
      guardian_status: "Alive",
      parent_address: "123 Test Parent Address",
      parent_postal_code: "12345",
      parent_subdistrict: "Test Parent Subdistrict",
      parent_province: "Test Parent Province",
      parent_city: "Test Parent City",
      father_education: "Graduate",
      mother_education: "Graduate",
      guardian_education: "Graduate",
      father_occupation: EOccupation.BURUH,
      mother_occupation: EOccupation.GURU,
      guardian_occupation: EOccupation.NELAYAN,
      father_income: "10000",
      mother_income: "10000",
      guardian_income: "10000",
      guardian_address: "123 Test Guardian Address",
      guardian_postal_code: "12345",
      guardian_subdistrict: "Test Guardian Subdistrict",
      guardian_province: "Test Guardian Province",
      guardian_city: "Test Guardian City",
      faculty_type: "Science",
      education_programs: "Test Program",
      study_program: "Test Study Program",
      selection_type: "Test Selection Type",
      family_card: "1234567890",
      pass_photo: "Test Pass Photo",
      ktp_card: "1234567890",
      school_report_card: "Test Report Card",
      birth_certificate: "Test Birth Certificate",
      additional_documents: "Test Document",
      ijazah_card: "Test Ijazah Card",
      kipk_card: "Test Kipk Card",
      academic_year: "2022-2023",
      registration_wave: "First",
      registration_status: "Registered",
    };

    const result = await controller.updateData(reqToken, avatar, studentData);
    expect(result).toBeDefined();
    expect(mockStudentService.updateStudent).toHaveBeenCalledWith({
      id: reqToken.user.sub,
      avatar,
      ...studentData,
    });
  });

  it("should delete student data", async () => {
    const id = "1";
    const result = await controller.deleteDataById(id);
    expect(result).toBeDefined();
    expect(mockStudentService.deleteStudent).toHaveBeenCalledWith({ id });
  });

  it("should update student data by id", async () => {
    const id = "1";
    const avatar: TFIle = {
      fieldname: "",
      originalname: "",
      encoding: "",
      mimetype: "",
      size: 0,
      destination: "",
      filename: "",
      path: "",
      buffer: Buffer.alloc(0),
    };
    const studentData: UpdateStudentSwagger = {
      email: "example@gmail.com",
      fullname: "Test Student",
      nik: "1234567890123456",
      nisn: "1234567890",
      birth_place: "Test Place",
      birth_date: "2000-01-01",
      gender: EGender.MALE,
      phone_number: "1234567890",
      religion: EReligion.ISLAM,
      citizenship: ECitizenship.WNI,
      marital_status: "Single",
      country: "Indonesia",
      address: "123 Test Address",
      postal_code: "12345",
      subdistrict: "Test Subdistrict",
      province: "Test Province",
      city: "Test City",
      school_type: "Test Type",
      graduation_year: "2022",
      school_major: "Test Major",
      school_name: "Test School",
      school_npsm: "1234567890",
      school_address: "123 Test School Address",
      school_postal_code: "12345",
      school_subdistrict: "Test School Subdistrict",
      school_province: "Test School Province",
      school_city: "Test School City",
      school_phone_number: "1234567890",
      father_name: "Test Father",
      mother_name: "Test Mother",
      guardian_name: "Test Guardian",
      father_status: "Alive",
      mother_status: "Alive",
      guardian_status: "Alive",
      parent_address: "123 Test Parent Address",
      parent_postal_code: "12345",
      parent_subdistrict: "Test Parent Subdistrict",
      parent_province: "Test Parent Province",
      parent_city: "Test Parent City",
      father_education: "Graduate",
      mother_education: "Graduate",
      guardian_education: "Graduate",
      father_occupation: EOccupation.BURUH,
      mother_occupation: EOccupation.DOKTER,
      guardian_occupation: EOccupation.GURU,
      father_income: "10000",
      mother_income: "10000",
      guardian_income: "10000",
      guardian_address: "123 Test Guardian Address",
      guardian_postal_code: "12345",
      guardian_subdistrict: "Test Guardian Subdistrict",
      guardian_province: "Test Guardian Province",
      guardian_city: "Test Guardian City",
      faculty_type: "Science",
      education_programs: "Test Program",
      study_program: "Test Study Program",
      selection_type: "Test Selection Type",
      family_card: "1234567890",
      pass_photo: "Test Pass Photo",
      ktp_card: "1234567890",
      school_report_card: "Test Report Card",
      birth_certificate: "Test Birth Certificate",
      additional_documents: "Test Document",
      ijazah_card: "Test Ijazah Card",
      kipk_card: "Test Kipk Card",
      academic_year: "2022-2023",
      registration_wave: "First",
      registration_status: "Registered",
    };
    const result = await controller.updateDataById(id, avatar, studentData);
    expect(result).toBeDefined();
    expect(mockStudentService.updateStudent).toHaveBeenCalledWith({
      id,
      avatar,
      ...studentData,
    });
  });

  it("should get student data by id", async () => {
    const id = "1";
    const result = await controller.getDataById(id);
    expect(result).toBeDefined();
    expect(mockStudentService.getStudent).toHaveBeenCalledWith({ id });
  });
});

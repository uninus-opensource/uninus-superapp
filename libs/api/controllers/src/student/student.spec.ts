import { Test, TestingModule } from "@nestjs/testing";
import { StudentController } from ".";
import { StudentService, UpdateStudentSwagger } from "@uninus/api/services";
import {
  IDeleteStudentResponse,
  IGetStudentResponse,
  IStudentData,
  IUpdateStudentResponse,
  TReqToken,
} from "@uninus/entities";

describe("StudentController", () => {
  let studentController: StudentController;
  let studentService: StudentService;

  beforeEach(async () => {
    let app: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: {
            getStudent: jest.fn(),
            updateStudent: jest.fn(),
            deleteStudent: jest.fn(),
          },
        },
      ],
    }).compile();

    studentController = app.get<StudentController>(StudentController);
    studentService = app.get<StudentService>(StudentService);
  });

  describe("getStudent", () => {
    it("should return student data and return 200", async () => {
      const mockToken: TReqToken = {
        user: {
          email: "user@example.com",
          role: "developer",
          sub: "a4444283-efbb-4c07-b45e-25af46db8dcf",
        },
      };

      const expectedResult: IGetStudentResponse = {
        first_deparment_id: 1,
        second_deparment_id: null,
        selection_path_id: 2,
        degree_program_id: null,
        email: "student@example.com",
        fullname: "John Doe",
        nik: "123456789",
        nisn: null,
        no_kk: null,
        gender_id: 1,
        religion_id: 2,
        birth_place: "Cityville",
        birth_date: "1995-03-15",
        phone_number: "1234567890",
        citizenship_id: 3,
        marital_status_id: null,
        country_id: 4,
        address: "123 Main Street",
        subdistrict_id: 5,
        province_id: 6,
        city_id: 7,
        education_type_id: 8,
        education_major_id: null,
        graduation_year: "2023",
        education_npsn: null,
        father_name: "John Sr.",
        father_status_id: 9,
        father_education_id: 10,
        father_occupation_id: 11,
        father_position_id: 12,
        father_salary_id: 13,
        mother_name: "Jane Doe",
        mother_status_id: 14,
        mother_education_id: 15,
        mother_occupation_id: 16,
        mother_position_id: 17,
        mother_salary_id: 18,
        guardian_name: null,
        guardian_status_id: null,
        guardian_education_id: null,
        guardian_occupation_id: null,
        guardian_position_id: null,
        guardian_salary_id: null,
        parent_province_id: 19,
        parent_subdistrict_id: 20,
        parent_city_id: 21,
        parent_address: "456 Elm Avenue",
        scholarship_id: null,
        faculty_id: 22,
        department_id: 23,
        academic_year: "2023/2024",
        utbk: 450,
        average_grade: 85.5,
        avatar: "https://example.com/avatar.jpg",
        student_grade: [
          {
            id: "1",
            subject: "Math",
            semester: "1",
            grade: 90,
          },
          {
            id: "2",
            subject: "Science",
            semester: "1",
            grade: 85,
          },
          {
            id: "3",
            subject: "History",
            semester: "2",
            grade: 78,
          },
        ],
      };

      jest.spyOn(studentService, "getStudent").mockResolvedValue(expectedResult);
      const response = await studentController.getData(mockToken);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("updateStudent", () => {
    it("should return the updated student and return status 200", async () => {
      const mockToken: TReqToken = {
        user: {
          email: "user@example.com",
          role: "developer",
          sub: "a4444283-efbb-4c07-b45e-25af46db8dcf",
        },
      };

      const expectedResult: IUpdateStudentResponse = {
        first_deparment_id: 1,
        second_deparment_id: null,
        selection_path_id: 2,
        degree_program_id: null,
        email: "updated.student@example.com",
        fullname: "Updated John Doe",
        nik: "987654321",
        nisn: null,
        no_kk: null,
        gender_id: 2,
        religion_id: 3,
        birth_place: "Townsville",
        birth_date: "1997-08-30",
        phone_number: "9876543210",
        citizenship_id: 4,
        marital_status_id: null,
        country_id: 5,
        address: "789 Oak Street",
        subdistrict_id: 6,
        province_id: 7,
        city_id: 8,
        education_type_id: 9,
        education_major_id: null,
        graduation_year: "2025",
        education_npsn: null,
        father_name: "Updated John Sr.",
        father_status_id: 8,
        father_education_id: 9,
        father_occupation_id: 10,
        father_position_id: 11,
        father_salary_id: 12,
        mother_name: "Updated Jane Doe",
        mother_status_id: 13,
        mother_education_id: 14,
        mother_occupation_id: 15,
        mother_position_id: 16,
        mother_salary_id: 17,
        guardian_name: "Updated Guardian",
        guardian_status_id: 19,
        guardian_education_id: 20,
        guardian_occupation_id: 21,
        guardian_position_id: 22,
        guardian_salary_id: 23,
        parent_province_id: 24,
        parent_subdistrict_id: 25,
        parent_city_id: 26,
        parent_address: "987 Pine Avenue",
        scholarship_id: null,
        faculty_id: 27,
        department_id: 28,
        academic_year: "2025/2026",
        utbk: 480,
        average_grade: 88.5,
        avatar: "https://example.com/updated-avatar.jpg",
        student_grade: [
          {
            id: "1",
            subject: "Math",
            semester: "1",
            grade: 92,
          },
          {
            id: "2",
            subject: "Science",
            semester: "1",
            grade: 87,
          },
          {
            id: "3",
            subject: "History",
            semester: "2",
            grade: 80,
          },
        ],
      };

      jest.spyOn(studentService, "updateStudent").mockResolvedValue(expectedResult);

      const expectedRequestData = new UpdateStudentSwagger();

      Object.assign(expectedRequestData, expectedResult);

      const response = await studentController.updateData(mockToken, expectedRequestData);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("deleteStudent", () => {
    it("should delete a student successfully and return the deleted student", async () => {
      const id = "c4e046f0-c69c-4db4-821c-fb7b4946e255";

      const mockStudentData: IStudentData = {
        first_deparment_id: 1,
        second_deparment_id: 2,
        selection_path_id: 3,
        degree_program_id: 4,
        email: "student@example.com",
        fullname: "John Doe",
        nik: "1234567890",
        nisn: "9876543210",
        no_kk: "0987654321",
        gender_id: 1,
        religion_id: 2,
        birth_place: "Cityville",
        birth_date: "1998-05-15",
        phone_number: "123456789",
        citizenship_id: 1,
        marital_status_id: 1,
        country_id: 1,
        address: "123 Main St",
        subdistrict_id: 5,
        province_id: 6,
        city_id: 7,
        education_type_id: 8,
        education_major_id: 9,
        graduation_year: "2023",
        education_npsn: "123456789",
        father_name: "John Sr.",
        father_status_id: 1,
        father_education_id: 10,
        father_occupation_id: 11,
        father_position_id: 12,
        father_salary_id: 13,
        mother_name: "Jane Doe",
        mother_status_id: 1,
        mother_education_id: 14,
        mother_occupation_id: 15,
        mother_position_id: 16,
        mother_salary_id: 17,
        guardian_name: "Guardian Doe",
        guardian_status_id: 2,
        guardian_education_id: 18,
        guardian_occupation_id: 19,
        guardian_position_id: 20,
        guardian_salary_id: 21,
        parent_province_id: 22,
        parent_subdistrict_id: 23,
        parent_city_id: 24,
        parent_address: "456 Side St",
        scholarship_id: 25,
        faculty_id: 26,
        department_id: 27,
        academic_year: "2023/2024",
        utbk: 450,
        average_grade: 85.5,
      };

      const mockDeleteStudentResponse: IDeleteStudentResponse = {
        ...mockStudentData,
        avatar: "path/to/avatar.jpg",
        student_grade: [
          {
            id: "1",
            subject: "Math",
            semester: "Semester 1",
            grade: 90,
          },
          {
            id: "2",
            subject: "Science",
            semester: "Semester 1",
            grade: 85,
          },
          {
            id: "3",
            subject: "History",
            semester: "2",
            grade: 80,
          },
        ],
      };

      jest.spyOn(studentService, "deleteStudent").mockResolvedValue(mockDeleteStudentResponse);

      const response = await studentController.deleteDataById(id);
      expect(response).toEqual(mockDeleteStudentResponse);
    });
  });

  describe("updateStudentById", () => {
    it("should return the updated student by id and return status 200", async () => {
      const id = "c4e046f0-c69c-4db4-821c-fb7b4946e255";

      const expectedResult: IUpdateStudentResponse = {
        first_deparment_id: 1,
        second_deparment_id: null,
        selection_path_id: 2,
        degree_program_id: null,
        email: "updated.student@example.com",
        fullname: "Updated John Doe",
        nik: "987654321",
        nisn: null,
        no_kk: null,
        gender_id: 2,
        religion_id: 3,
        birth_place: "Townsville",
        birth_date: "1997-08-30",
        phone_number: "9876543210",
        citizenship_id: 4,
        marital_status_id: null,
        country_id: 5,
        address: "789 Oak Street",
        subdistrict_id: 6,
        province_id: 7,
        city_id: 8,
        education_type_id: 9,
        education_major_id: null,
        graduation_year: "2025",
        education_npsn: null,
        father_name: "Updated John Sr.",
        father_status_id: 8,
        father_education_id: 9,
        father_occupation_id: 10,
        father_position_id: 11,
        father_salary_id: 12,
        mother_name: "Updated Jane Doe",
        mother_status_id: 13,
        mother_education_id: 14,
        mother_occupation_id: 15,
        mother_position_id: 16,
        mother_salary_id: 17,
        guardian_name: "Updated Guardian",
        guardian_status_id: 19,
        guardian_education_id: 20,
        guardian_occupation_id: 21,
        guardian_position_id: 22,
        guardian_salary_id: 23,
        parent_province_id: 24,
        parent_subdistrict_id: 25,
        parent_city_id: 26,
        parent_address: "987 Pine Avenue",
        scholarship_id: null,
        faculty_id: 27,
        department_id: 28,
        academic_year: "2025/2026",
        utbk: 480,
        average_grade: 88.5,
        avatar: "https://example.com/updated-avatar.jpg",
        student_grade: [
          {
            id: "1",
            subject: "Math",
            semester: "1",
            grade: 92,
          },
          {
            id: "2",
            subject: "Science",
            semester: "1",
            grade: 87,
          },
          {
            id: "3",
            subject: "History",
            semester: "2",
            grade: 80,
          },
        ],
      };

      jest.spyOn(studentService, "updateStudent").mockResolvedValue(expectedResult);

      const expectedRequestData = new UpdateStudentSwagger();

      Object.assign(expectedRequestData, expectedResult);

      const response = await studentController.updateDataById(id, expectedRequestData);

      expect(response).toEqual(expectedResult);
    });
  });

  describe("getStudent", () => {
    it("should return student data and return 200", async () => {
      const id = "c4e046f0-c69c-4db4-821c-fb7b4946e255";

      const expectedResult: IGetStudentResponse = {
        first_deparment_id: 1,
        second_deparment_id: null,
        selection_path_id: 2,
        degree_program_id: null,
        email: "student@example.com",
        fullname: "John Doe",
        nik: "123456789",
        nisn: null,
        no_kk: null,
        gender_id: 1,
        religion_id: 2,
        birth_place: "Cityville",
        birth_date: "1995-03-15",
        phone_number: "1234567890",
        citizenship_id: 3,
        marital_status_id: null,
        country_id: 4,
        address: "123 Main Street",
        subdistrict_id: 5,
        province_id: 6,
        city_id: 7,
        education_type_id: 8,
        education_major_id: null,
        graduation_year: "2023",
        education_npsn: null,
        father_name: "John Sr.",
        father_status_id: 9,
        father_education_id: 10,
        father_occupation_id: 11,
        father_position_id: 12,
        father_salary_id: 13,
        mother_name: "Jane Doe",
        mother_status_id: 14,
        mother_education_id: 15,
        mother_occupation_id: 16,
        mother_position_id: 17,
        mother_salary_id: 18,
        guardian_name: null,
        guardian_status_id: null,
        guardian_education_id: null,
        guardian_occupation_id: null,
        guardian_position_id: null,
        guardian_salary_id: null,
        parent_province_id: 19,
        parent_subdistrict_id: 20,
        parent_city_id: 21,
        parent_address: "456 Elm Avenue",
        scholarship_id: null,
        faculty_id: 22,
        department_id: 23,
        academic_year: "2023/2024",
        utbk: 450,
        average_grade: 85.5,
        avatar: "https://example.com/avatar.jpg",
        student_grade: [
          {
            id: "1",
            subject: "Math",
            semester: "1",
            grade: 90,
          },
          {
            id: "2",
            subject: "Science",
            semester: "1",
            grade: 85,
          },
          {
            id: "3",
            subject: "History",
            semester: "2",
            grade: 78,
          },
        ],
      };

      jest.spyOn(studentService, "getStudent").mockResolvedValue(expectedResult);
      const response = await studentController.getDataById(id);

      expect(response).toEqual(expectedResult);
    });
  });
});

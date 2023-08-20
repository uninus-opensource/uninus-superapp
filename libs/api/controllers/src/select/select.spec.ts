import { Test, TestingModule } from "@nestjs/testing";
import { SelectController } from ".";
import { SelectService } from "@uninus/api/services";
import {
  ICityRequest,
  ICountryRequest,
  IOccupationPositionRequest,
  ISelectDepartmentRequest,
  ISelectEducationHistoryRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  ISelectSchoolMajorRequest,
  ISubDistrictRequest,
} from "@uninus/entities";

describe("SelectController", () => {
  let app: TestingModule;
  let selectController: SelectController;
  let selectService: SelectService;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [SelectController],
      providers: [
        {
          provide: SelectService,
          useValue: {
            getProvince: jest.fn(),
            getCity: jest.fn(),
            getSubDistrict: jest.fn(),
            getDegreeProgram: jest.fn(),
            getFaculty: jest.fn(),
            getDepartment: jest.fn(),
            getReligion: jest.fn(),
            getMaritalStatus: jest.fn(),
            getGender: jest.fn(),
            getCitizenship: jest.fn(),
            getSelectionPath: jest.fn(),
            getSalary: jest.fn(),
            getCountry: jest.fn(),
            getEducation: jest.fn(),
            getOccupation: jest.fn(),
            getOccupationPosition: jest.fn(),
            getDisabilites: jest.fn(),
            getYearGraduate: jest.fn(),
            getScholarship: jest.fn(),
            getEducationType: jest.fn(),
            getEducationMajor: jest.fn(),
            getParentStatus: jest.fn(),
            getParentEducation: jest.fn(),
            getTotalRegistrans: jest.fn(),
          },
        },
      ],
    }).compile();
    selectController = app.get<SelectController>(SelectController);
    selectService = app.get<SelectService>(SelectService);
  });

  describe("Get Province", () => {
    it("should return province data and status 200", async () => {
      const payload = {
        id: 1,
        search: "Sumatra",
      };

      const expectedResult = {
        province: [
          {
            id: 11,
            name: "ACEH",
          },
          {
            id: 12,
            name: "SUMATERA UTARA",
          },
          {
            id: 13,
            name: "SUMATERA BARAT",
          },
          {
            id: 14,
            name: "RIAU",
          },
          {
            id: 15,
            name: "JAMBI",
          },
          {
            id: 16,
            name: "SUMATERA SELATAN",
          },
          {
            id: 17,
            name: "BENGKULU",
          },
          {
            id: 18,
            name: "LAMPUNG",
          },
          {
            id: 19,
            name: "KEPULAUAN BANGKA BELITUNG",
          },
          {
            id: 21,
            name: "KEPULAUAN RIAU",
          },
          {
            id: 31,
            name: "DKI JAKARTA",
          },
          {
            id: 32,
            name: "JAWA BARAT",
          },
          {
            id: 33,
            name: "JAWA TENGAH",
          },
          {
            id: 34,
            name: "DI YOGYAKARTA",
          },
          {
            id: 35,
            name: "JAWA TIMUR",
          },
          {
            id: 36,
            name: "BANTEN",
          },
          {
            id: 51,
            name: "BALI",
          },
          {
            id: 52,
            name: "NUSA TENGGARA BARAT",
          },
          {
            id: 53,
            name: "NUSA TENGGARA TIMUR",
          },
          {
            id: 61,
            name: "KALIMANTAN BARAT",
          },
          {
            id: 62,
            name: "KALIMANTAN TENGAH",
          },
          {
            id: 63,
            name: "KALIMANTAN SELATAN",
          },
          {
            id: 64,
            name: "KALIMANTAN TIMUR",
          },
          {
            id: 65,
            name: "KALIMANTAN UTARA",
          },
          {
            id: 71,
            name: "SULAWESI UTARA",
          },
          {
            id: 72,
            name: "SULAWESI TENGAH",
          },
          {
            id: 73,
            name: "SULAWESI SELATAN",
          },
          {
            id: 74,
            name: "SULAWESI TENGGARA",
          },
          {
            id: 75,
            name: "GORONTALO",
          },
          {
            id: 76,
            name: "SULAWESI BARAT",
          },
          {
            id: 81,
            name: "MALUKU",
          },
          {
            id: 82,
            name: "MALUKU UTARA",
          },
          {
            id: 91,
            name: "PAPUA BARAT",
          },
          {
            id: 94,
            name: "PAPUA",
          },
        ],
      };

      (selectService.getProvince as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getProvince(payload.id, payload.search);
      expect(response).toEqual({
        province: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get City", () => {
    it("should return city and status 200", async () => {
      const payload: ICityRequest = {
        id: 1,
        search: "Aceh",
        province_id: "11",
      };

      const expectedResult = {
        city: [
          {
            id: 1102,
            name: "KABUPATEN ACEH SINGKIL",
            province_id: 11,
          },
          {
            id: 1103,
            name: "KABUPATEN ACEH SELATAN",
            province_id: 11,
          },
          {
            id: 1104,
            name: "KABUPATEN ACEH TENGGARA",
            province_id: 11,
          },
          {
            id: 1105,
            name: "KABUPATEN ACEH TIMUR",
            province_id: 11,
          },
          {
            id: 1106,
            name: "KABUPATEN ACEH TENGAH",
            province_id: 11,
          },
          {
            id: 1107,
            name: "KABUPATEN ACEH BARAT",
            province_id: 11,
          },
          {
            id: 1108,
            name: "KABUPATEN ACEH BESAR",
            province_id: 11,
          },
          {
            id: 1111,
            name: "KABUPATEN ACEH UTARA",
            province_id: 11,
          },
          {
            id: 1112,
            name: "KABUPATEN ACEH BARAT DAYA",
            province_id: 11,
          },
          {
            id: 1114,
            name: "KABUPATEN ACEH TAMIANG",
            province_id: 11,
          },
          {
            id: 1116,
            name: "KABUPATEN ACEH JAYA",
            province_id: 11,
          },
          {
            id: 1171,
            name: "KOTA BANDA ACEH",
            province_id: 11,
          },
        ],
      };

      (selectService.getCity as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getCity(
        Number(payload.province_id),
        String(payload.search),
        String(payload.id),
      );
      
      expect(response).toEqual({
        city: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Subdistrict", () => {
    it("should return subdistrict and status 200", async () => {
      const payload: ISubDistrictRequest = {
        id: 1,
        city_id: "3204",
        search: "Soreang",
      };

      const expectedResult = {
        sub_district: [
          {
            id: 3204190,
            name: "SOREANG",
            city_id: 3204,
          },
        ],
      };

      (selectService.getSubDistrict as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getSubDistrict(
        Number(payload.city_id),
        String(payload.search),
        String(payload.id),
      );

      expect(response).toEqual({
        sub_district: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Degree Program", () => {
    it("should return degree program and status 200", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Program Sarjana(S1)",
      };

      const expectedResult = {
        degree_program: [
          {
            id: 1,
            name: "Program Sarjana(S1)",
          },
        ],
      };

      (selectService.getDegreeProgram as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getDegreeProgram(
        String(payload.search),
        Number(payload.id),
      );

      expect(response).toEqual({
        degree_program: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Faculty", () => {
    it("should return faculty and 200 ok", async () => {
      const payload: ISelectFacultyRequest = {
        id: 8,
        search: "Fakultas Teknik",
        degree_program_id: "1",
      };

      const expectedResult = {
        faculty: [
          {
            id: 8,
            name: "Fakultas Teknik",
          },
        ],
      };

      (selectService.getFaculty as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getFaculty(
        Number(payload.id),
        String(payload.search),
        String(payload.degree_program_id),
      );

      expect(response).toEqual({
        faculty: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Department", () => {
    it("should return department and status 200", async () => {
      const payload: ISelectDepartmentRequest = {
        id: 17,
        search: "Teknik Informatika",
        faculty_id: "8",
        degree_program_id: "1",
      };

      const expectedResult = {
        department: [
          {
            id: 17,
            name: "S1 - Teknik Informatika",
          },
        ],
      };

      (selectService.getDepartment as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getDepartment(
        Number(payload.id),
        String(payload.search),
        String(payload.faculty_id),
        String(payload.degree_program_id),
      );

      expect(response).toEqual({
        department: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Religion", () => {
    it("should return religion and status 200", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Islam",
      };

      const expectedResult = {
        religion: [
          {
            id: 1,
            name: "Islam",
          },
        ],
      };
      (selectService.getReligion as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getReligion(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        religion: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Marital Status", () => {
    it("should return marital status", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Sudah menikah",
      };

      const expectedResult = {
        maritalStatus: [
          {
            id: 1,
            name: "Sudah Menikah",
          },
        ],
      };

      (selectService.getMaritalStatus as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getMaritalStatus(
        Number(payload.id),
        String(payload.search),
      );
      
      expect(response).toEqual({
        maritalStatus: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Gender", () => {
    it("should return gender", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Laki-Laki",
      };

      const expectedResult = {
        gender: [
          {
            id: 1,
            name: "Laki-Laki",
          },
        ],
      };

      (selectService.getGender as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getGender(Number(payload.id), String(payload.search));
      
      expect(response).toEqual({
        gender: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Citizenship", () => {
    it("should return citizenship", async () => {
      const payload: ISelectRequest = {
        id: 2,
        search: "WNI",
      };

      const expectedResult = {
        citizenship: [
          {
            id: 2,
            name: "WNI",
          },
        ],
      };

      (selectService.getCitizenship as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getCitizenship(
        Number(payload.id),
        String(payload.search),
      );
      
      expect(response).toEqual({
        citizenship: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      })
    });
  });

  describe("Get Selection Path", () => {
    it("should return selection path", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Seleksi Prestasi Akademik(SPA)",
      };
      const expectedResult = {
        selection: [
          {
            id: 1,
            name: "Seleksi Prestasi Akademik(SPA)",
          },
        ],
      };

      (selectService.getSelectionPath as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getSelectionPath(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        selection: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Salary", () => {
    it("should return salary", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "<Rp.700.000",
      };

      const expectedResult = {
        salary: [
          {
            id: 1,
            name: "<Rp.700.000",
          },
        ],
      };

      (selectService.getSalary as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getSalary(Number(payload.id), String(payload.search));

      expect(response).toEqual({
        salary: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Education", () => {
    it("should return education", async () => {
      const payload: ISelectEducationHistoryRequest = {
        id: 1,
        search: "SMAN 69 JAKARTA",
        npsn: "20107185",
      };

      const expectedResult = {
        education: [
          {
            id: 1,
            name: "SMAN 69 JAKARTA",
            npsn: "20107185",
          },
        ],
      };

      (selectService.getEducation as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getEducationHistory(
        Number(payload.id),
        String(payload.search),
        String(payload.npsn),
      );

      expect(response).toEqual({
        education: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Country", () => {
    it("should return country", async () => {
      const payload: ICountryRequest = {
        id: 1,
        search: "Afghanistan",
        citizenship_id: "1",
      };

      const expectedResult = {
        country: [
          {
            id: 1,
            name: "Afghanistan",
          },
        ],
      };

      (selectService.getCountry as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getCountry(
        Number(payload.id),
        String(payload.search),
        String(payload.citizenship_id),
      );

      expect(response).toEqual({
        country: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Occupation", () => {
    it("should return occupation", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "TNI",
      };

      const expectedResult = {
        occupation: [
          {
            id: 1,
            name: "TNI",
          },
        ],
      };

      (selectService.getOccupation as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getOccupation(
        Number(payload.id),
        String(payload.search),
      );
      expect(response).toEqual({
        occupation: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Occupation Position", () => {
    it("should return occupation position", async () => {
      const payload: IOccupationPositionRequest = {
        id: 89,
        search: "Jenderal TNI",
        occupation_id: "1",
      };

      const expectedResult = {
        occupation_position: [
          {
            id: 89,
            name: "Jenderal TNI",
          },
        ],
      };

      (selectService.getOccupationPosition as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getOccupationPosition(
        Number(payload.id),
        String(payload.search),
        String(payload.occupation_id),
      );

      expect(response).toEqual({
        occupation_position: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Disabilities", () => {
    it("should return disabillities", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Tuna Daksa",
      };

      const expectedResult = {
        disabilities: [
          {
            id: 1,
            name: "Tuna Daksa",
          },
        ],
      };

      (selectService.getDisabilites as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getDisablities(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        disabilities: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Year Graduation", () => {
    it("should return an array of years", async () => {
      const mockResponse = {
        year: [
          { id: 1, name: 1983 },
          { id: 2, name: 1984 },
        ],
      };

      (selectService.getYearGraduate as jest.Mock).mockResolvedValue(mockResponse);

      const response = await selectController.getYearGraduate();

      expect(response).toEqual({
        year: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(Number),
          }),
        ]),
      });
    });
  });

  describe("Get Scholarship", () => {
    it("should return scholarship", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Beasiswa Nusantara Unggu",
      };

      const expectedResult = {
        scholarship: [
          {
            id: 1,
            name: "Beasiswa Nusantara Unggu",
          },
        ],
      };

      (selectService.getScholarship as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getScholarship(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        scholarship: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Education Type", () => {
    it("should return education type", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "SMA",
      };

      const expectedResult = {
        education_type: [
          {
            id: 1,
            name: "SMA",
          },
        ],
      };

      (selectService.getEducationType as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getSchoolType(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        education_type: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Education Major", () => {
    it("should return education major", async () => {
      const payload: ISelectSchoolMajorRequest = {
        id: 1,
        search: "IPA",
        education_type_id: "1",
      };

      const expectedResult = {
        education_major: [
          {
            id: 1,
            name: "IPA",
          },
        ],
      };

      (selectService.getEducationMajor as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getSchoolMajor(
        Number(payload.id),
        String(payload.search),
        String(payload.education_type_id),
      );

      expect(response).toEqual({
        education_major: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Parent Status", () => {
    it("should return parent status", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Masih Hidup",
      };

      const expectedResult = {
        parent_status: [
          {
            id: 1,
            name: "Masih Hidup",
          },
        ],
      };

      (selectService.getParentStatus as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getParentStatus(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        parent_status: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Parent Education", () => {
    it("should return parent education", async () => {
      const payload: ISelectRequest = {
        id: 1,
        search: "Tidak Sekolah",
      };

      const expectedResult = {
        parent_education: [
          {
            id: 1,
            name: "Tidak sekolah",
          },
        ],
      };

      (selectService.getParentEducation as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getParentEducation(
        Number(payload.id),
        String(payload.search),
      );

      expect(response).toEqual({
        parent_education: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("Get Registrans", () => {
    it("should return registrans", async () => {
      const expectedResult = {
        total_registrans: 9,
        paids: 0,
        unpaids: 0,
        accepted_registrans: 3,
      };

      (selectService.getTotalRegistrans as jest.Mock).mockResolvedValue(expectedResult);

      const response = await selectController.getRegistan();

      expect(response).toEqual({
        total_registrans: expect.any(Number),
        paids: expect.any(Number),
        unpaids: expect.any(Number),
        accepted_registrans: expect.any(Number),
      });
    });
  });
});

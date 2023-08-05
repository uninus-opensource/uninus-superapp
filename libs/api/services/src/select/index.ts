import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import {
  TCitizenshipResponse,
  TDepartmentResponse,
  TFacultyResponse,
  TGenderResponse,
  TMaritalStatusResponse,
  TReligionResponse,
  TSalaryResponse,
  TSelectionResponse,
  ISelectRequest,
  TCountryResponse,
  TEducationHistoryResponse,
  TDegreeProgramResponse,
  ISelectFacultyRequest,
  ISelectDepartmentRequest,
  TProvinceResponse,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
  TOccupationResponse,
  TDisabilitiesResponse,
  TYearGraduationResponse,
  ISelectEducationHistoryRequest,
  TScholarshipResponse,
  ICountryRequest,
} from "@uninus/entities";

@Injectable()
export class SelectService {
  constructor(private prisma: PrismaService) {}

  async getProvince({ search }: ISelectRequest): Promise<TProvinceResponse> {
    const province = await this.prisma.province.findMany({
      where: {
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!province) {
      throw new NotFoundException("Data tidak ditemukan");
    }
    return {
      province,
    };

    //   data: [
    //     { name: "Afghanistan", citizenship_id: 1 },
    //     { name: "Åland Islands", citizenship_id: 1 },
    //     { name: "Albania", citizenship_id: 1 },
    //     { name: "Algeria", citizenship_id: 1 },
    //     { name: "American Samoa", citizenship_id: 1 },
    //     { name: "AndorrA", citizenship_id: 1 },
    //     { name: "Angola", citizenship_id: 1 },
    //     { name: "Anguilla", citizenship_id: 1 },
    //     { name: "Antarctica", citizenship_id: 1 },
    //     { name: "Antigua and Barbuda", citizenship_id: 1 },
    //     { name: "Argentina", citizenship_id: 1 },
    //     { name: "Armenia", citizenship_id: 1 },
    //     { name: "Aruba", citizenship_id: 1 },
    //     { name: "Australia", citizenship_id: 1 },
    //     { name: "Austria", citizenship_id: 1 },
    //     { name: "Azerbaijan", citizenship_id: 1 },
    //     { name: "Bahamas", citizenship_id: 1 },
    //     { name: "Bahrain", citizenship_id: 1 },
    //     { name: "Bangladesh", citizenship_id: 1 },
    //     { name: "Barbados", citizenship_id: 1 },
    //     { name: "Belarus", citizenship_id: 1 },
    //     { name: "Belgium", citizenship_id: 1 },
    //     { name: "Belize", citizenship_id: 1 },
    //     { name: "Benin", citizenship_id: 1 },
    //     { name: "Bermuda", citizenship_id: 1 },
    //     { name: "Bhutan", citizenship_id: 1 },
    //     { name: "Bolivia", citizenship_id: 1 },
    //     { name: "Bosnia and Herzegovina", citizenship_id: 1 },
    //     { name: "Botswana", citizenship_id: 1 },
    //     { name: "Bouvet Island", citizenship_id: 1 },
    //     { name: "Brazil", citizenship_id: 1 },
    //     { name: "British Indian Ocean Territory", citizenship_id: 1 },
    //     { name: "Brunei Darussalam", citizenship_id: 1 },
    //     { name: "Bulgaria", citizenship_id: 1 },
    //     { name: "Burkina Faso", citizenship_id: 1 },
    //     { name: "Burundi", citizenship_id: 1 },
    //     { name: "Cambodia", citizenship_id: 1 },
    //     { name: "Cameroon", citizenship_id: 1 },
    //     { name: "Canada", citizenship_id: 1 },
    //     { name: "Cape Verde", citizenship_id: 1 },
    //     { name: "Cayman Islands", citizenship_id: 1 },
    //     { name: "Central African Republic", citizenship_id: 1 },
    //     { name: "Chad", citizenship_id: 1 },
    //     { name: "Chile", citizenship_id: 1 },
    //     { name: "China", citizenship_id: 1 },
    //     { name: "Christmas Island", citizenship_id: 1 },
    //     { name: "Cocos (Keeling) Islands", citizenship_id: 1 },
    //     { name: "Colombia", citizenship_id: 1 },
    //     { name: "Comoros", citizenship_id: 1 },
    //     { name: "Congo", citizenship_id: 1 },
    //     { name: "Congo, The Democratic Republic of the", citizenship_id: 1 },
    //     { name: "Cook Islands", citizenship_id: 1 },
    //     { name: "Costa Rica", citizenship_id: 1 },
    //     { name: "Cote D'Ivoire", citizenship_id: 1 },
    //     { name: "Croatia", citizenship_id: 1 },
    //     { name: "Cuba", citizenship_id: 1 },
    //     { name: "Cyprus", citizenship_id: 1 },
    //     { name: "Czech Republic", citizenship_id: 1 },
    //     { name: "Denmark", citizenship_id: 1 },
    //     { name: "Djibouti", citizenship_id: 1 },
    //     { name: "Dominica", citizenship_id: 1 },
    //     { name: "Dominican Republic", citizenship_id: 1 },
    //     { name: "Ecuador", citizenship_id: 1 },
    //     { name: "Egypt", citizenship_id: 1 },
    //     { name: "El Salvador", citizenship_id: 1 },
    //     { name: "Equatorial Guinea", citizenship_id: 1 },
    //     { name: "Eritrea", citizenship_id: 1 },
    //     { name: "Estonia", citizenship_id: 1 },
    //     { name: "Ethiopia", citizenship_id: 1 },
    //     { name: "Falkland Islands (Malvinas)", citizenship_id: 1 },
    //     { name: "Faroe Islands", citizenship_id: 1 },
    //     { name: "Fiji", citizenship_id: 1 },
    //     { name: "Finland", citizenship_id: 1 },
    //     { name: "France", citizenship_id: 1 },
    //     { name: "French Guiana", citizenship_id: 1 },
    //     { name: "French Polynesia", citizenship_id: 1 },
    //     { name: "French Southern Territories", citizenship_id: 1 },
    //     { name: "Gabon", citizenship_id: 1 },
    //     { name: "Gambia", citizenship_id: 1 },
    //     { name: "Georgia", citizenship_id: 1 },
    //     { name: "Germany", citizenship_id: 1 },
    //     { name: "Ghana", citizenship_id: 1 },
    //     { name: "Gibraltar", citizenship_id: 1 },
    //     { name: "Greece", citizenship_id: 1 },
    //     { name: "Greenland", citizenship_id: 1 },
    //     { name: "Grenada", citizenship_id: 1 },
    //     { name: "Guadeloupe", citizenship_id: 1 },
    //     { name: "Guam", citizenship_id: 1 },
    //     { name: "Guatemala", citizenship_id: 1 },
    //     { name: "Guernsey", citizenship_id: 1 },
    //     { name: "Guinea", citizenship_id: 1 },
    //     { name: "Guinea-Bissau", citizenship_id: 1 },
    //     { name: "Guyana", citizenship_id: 1 },
    //     { name: "Haiti", citizenship_id: 1 },
    //     { name: "Heard Island and Mcdonald Islands", citizenship_id: 1 },
    //     { name: "Holy See (Vatican City State)", citizenship_id: 1 },
    //     { name: "Honduras", citizenship_id: 1 },
    //     { name: "Hong Kong", citizenship_id: 1 },
    //     { name: "Hungary", citizenship_id: 1 },
    //     { name: "Iceland", citizenship_id: 1 },
    //     { name: "India", citizenship_id: 1 },
    //     { name: "Indonesia", citizenship_id: 2 },
    //     { name: "Iran, Islamic Republic Of", citizenship_id: 1 },
    //     { name: "Iraq", citizenship_id: 1 },
    //     { name: "Ireland", citizenship_id: 1 },
    //     { name: "Isle of Man", citizenship_id: 1 },
    //     { name: "Israel", citizenship_id: 1 },
    //     { name: "Italy", citizenship_id: 1 },
    //     { name: "Jamaica", citizenship_id: 1 },
    //     { name: "Japan", citizenship_id: 1 },
    //     { name: "Jersey", citizenship_id: 1 },
    //     { name: "Jordan", citizenship_id: 1 },
    //     { name: "Kazakhstan", citizenship_id: 1 },
    //     { name: "Kenya", citizenship_id: 1 },
    //     { name: "Kiribati", citizenship_id: 1 },
    //     { name: "Korea, Democratic People'S Republic of", citizenship_id: 1 },
    //     { name: "Korea, Republic of", citizenship_id: 1 },
    //     { name: "Kuwait", citizenship_id: 1 },
    //     { name: "Kyrgyzstan", citizenship_id: 1 },
    //     { name: "Lao People'S Democratic Republic", citizenship_id: 1 },
    //     { name: "Latvia", citizenship_id: 1 },
    //     { name: "Lebanon", citizenship_id: 1 },
    //     { name: "Lesotho", citizenship_id: 1 },
    //     { name: "Liberia", citizenship_id: 1 },
    //     { name: "Libyan Arab Jamahiriya", citizenship_id: 1 },
    //     { name: "Liechtenstein", citizenship_id: 1 },
    //     { name: "Lithuania", citizenship_id: 1 },
    //     { name: "Luxembourg", citizenship_id: 1 },
    //     { name: "Macao", citizenship_id: 1 },
    //     { name: "Macedonia, The Former Yugoslav Republic of", citizenship_id: 1 },
    //     { name: "Madagascar", citizenship_id: 1 },
    //     { name: "Malawi", citizenship_id: 1 },
    //     { name: "Malaysia", citizenship_id: 1 },
    //     { name: "Maldives", citizenship_id: 1 },
    //     { name: "Mali", citizenship_id: 1 },
    //     { name: "Malta", citizenship_id: 1 },
    //     { name: "Marshall Islands", citizenship_id: 1 },
    //     { name: "Martinique", citizenship_id: 1 },
    //     { name: "Mauritania", citizenship_id: 1 },
    //     { name: "Mauritius", citizenship_id: 1 },
    //     { name: "Mayotte", citizenship_id: 1 },
    //     { name: "Mexico", citizenship_id: 1 },
    //     { name: "Micronesia, Federated States of", citizenship_id: 1 },
    //     { name: "Moldova, Republic of", citizenship_id: 1 },
    //     { name: "Monaco", citizenship_id: 1 },
    //     { name: "Mongolia", citizenship_id: 1 },
    //     { name: "Montserrat", citizenship_id: 1 },
    //     { name: "Morocco", citizenship_id: 1 },
    //     { name: "Mozambique", citizenship_id: 1 },
    //     { name: "Myanmar", citizenship_id: 1 },
    //     { name: "Namibia", citizenship_id: 1 },
    //     { name: "Nauru", citizenship_id: 1 },
    //     { name: "Nepal", citizenship_id: 1 },
    //     { name: "Netherlands", citizenship_id: 1 },
    //     { name: "Netherlands Antilles", citizenship_id: 1 },
    //     { name: "New Caledonia", citizenship_id: 1 },
    //     { name: "New Zealand", citizenship_id: 1 },
    //     { name: "Nicaragua", citizenship_id: 1 },
    //     { name: "Niger", citizenship_id: 1 },
    //     { name: "Nigeria", citizenship_id: 1 },
    //     { name: "Niue", citizenship_id: 1 },
    //     { name: "Norfolk Island", citizenship_id: 1 },
    //     { name: "Northern Mariana Islands", citizenship_id: 1 },
    //     { name: "Norway", citizenship_id: 1 },
    //     { name: "Oman", citizenship_id: 1 },
    //     { name: "Pakistan", citizenship_id: 1 },
    //     { name: "Palau", citizenship_id: 1 },
    //     { name: "Palestinian Territory, Occupied", citizenship_id: 1 },
    //     { name: "Panama", citizenship_id: 1 },
    //     { name: "Papua New Guinea", citizenship_id: 1 },
    //     { name: "Paraguay", citizenship_id: 1 },
    //     { name: "Peru", citizenship_id: 1 },
    //     { name: "Philippines", citizenship_id: 1 },
    //     { name: "Pitcairn", citizenship_id: 1 },
    //     { name: "Poland", citizenship_id: 1 },
    //     { name: "Portugal", citizenship_id: 1 },
    //     { name: "Puerto Rico", citizenship_id: 1 },
    //     { name: "Qatar", citizenship_id: 1 },
    //     { name: "Reunion", citizenship_id: 1 },
    //     { name: "Romania", citizenship_id: 1 },
    //     { name: "Russian Federation", citizenship_id: 1 },
    //     { name: "RWANDA", citizenship_id: 1 },
    //     { name: "Saint Helena", citizenship_id: 1 },
    //     { name: "Saint Kitts and Nevis", citizenship_id: 1 },
    //     { name: "Saint Lucia", citizenship_id: 1 },
    //     { name: "Saint Pierre and Miquelon", citizenship_id: 1 },
    //     { name: "Saint Vincent and the Grenadines", citizenship_id: 1 },
    //     { name: "Samoa", citizenship_id: 1 },
    //     { name: "San Marino", citizenship_id: 1 },
    //     { name: "Sao Tome and Principe", citizenship_id: 1 },
    //     { name: "Saudi Arabia", citizenship_id: 1 },
    //     { name: "Senegal", citizenship_id: 1 },
    //     { name: "Serbia and Montenegro", citizenship_id: 1 },
    //     { name: "Seychelles", citizenship_id: 1 },
    //     { name: "Sierra Leone", citizenship_id: 1 },
    //     { name: "Singapore", citizenship_id: 1 },
    //     { name: "Slovakia", citizenship_id: 1 },
    //     { name: "Slovenia", citizenship_id: 1 },
    //     { name: "Solomon Islands", citizenship_id: 1 },
    //     { name: "Somalia", citizenship_id: 1 },
    //     { name: "South Africa", citizenship_id: 1 },
    //     { name: "South Georgia and the South Sandwich Islands", citizenship_id: 1 },
    //     { name: "Spain", citizenship_id: 1 },
    //     { name: "Sri Lanka", citizenship_id: 1 },
    //     { name: "Sudan", citizenship_id: 1 },
    //     { name: "Suriname", citizenship_id: 1 },
    //     { name: "Svalbard and Jan Mayen", citizenship_id: 1 },
    //     { name: "Swaziland", citizenship_id: 1 },
    //     { name: "Sweden", citizenship_id: 1 },
    //     { name: "Switzerland", citizenship_id: 1 },
    //     { name: "Syrian Arab Republic", citizenship_id: 1 },
    //     { name: "Taiwan, Province of China", citizenship_id: 1 },
    //     { name: "Tajikistan", citizenship_id: 1 },
    //     { name: "Tanzania, United Republic of", citizenship_id: 1 },
    //     { name: "Thailand", citizenship_id: 1 },
    //     { name: "Timor-Leste", citizenship_id: 1 },
    //     { name: "Togo", citizenship_id: 1 },
    //     { name: "Tokelau", citizenship_id: 1 },
    //     { name: "Tonga", citizenship_id: 1 },
    //     { name: "Trinidad and Tobago", citizenship_id: 1 },
    //     { name: "Tunisia", citizenship_id: 1 },
    //     { name: "Turkey", citizenship_id: 1 },
    //     { name: "Turkmenistan", citizenship_id: 1 },
    //     { name: "Turks and Caicos Islands", citizenship_id: 1 },
    //     { name: "Tuvalu", citizenship_id: 1 },
    //     { name: "Uganda", citizenship_id: 1 },
    //     { name: "Ukraine", citizenship_id: 1 },
    //     { name: "United Arab Emirates", citizenship_id: 1 },
    //     { name: "United Kingdom", citizenship_id: 1 },
    //     { name: "United States", citizenship_id: 1 },
    //     { name: "United States Minor Outlying Islands", citizenship_id: 1 },
    //     { name: "Uruguay", citizenship_id: 1 },
    //     { name: "Uzbekistan", citizenship_id: 1 },
    //     { name: "Vanuatu", citizenship_id: 1 },
    //     { name: "Venezuela", citizenship_id: 1 },
    //     { name: "Viet Nam", citizenship_id: 1 },
    //     { name: "Virgin Islands, British", citizenship_id: 1 },
    //     { name: "Virgin Islands, U.S.", citizenship_id: 1 },
    //     { name: "Wallis and Futuna", citizenship_id: 1 },
    //     { name: "Western Sahara", citizenship_id: 1 },
    //     { name: "Yemen", citizenship_id: 1 },
    //     { name: "Zambia", citizenship_id: 1 },
    //     { name: "Zimbabwe", citizenship_id: 1 },
    //   ],
    // });
  }

  async getCity({ province_id, search }: ICityRequest): Promise<TCityResponse> {
    const city = await this.prisma.city.findMany({
      where: {
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
        ...(province_id && { province_id: Number(province_id) }),
      },
    });
    if (!city) {
      throw new NotFoundException("Data tidak ditemukan");
    }
    return {
      city,
    };
  }

  async getSubDistrict({ city_id, search }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
    const subDistrict = await this.prisma.subDistrict.findMany({
      where: {
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
        ...(city_id && { city_id: Number(city_id) }),
      },
    });
    if (!subDistrict) {
      throw new NotFoundException("Data tidak ditemukan");
    }
    return {
      sub_district: subDistrict,
    };
  }

  async getDegreeProgram({ search }: ISelectRequest): Promise<TDegreeProgramResponse> {
    const degreeProgram = await this.prisma.degreeProgram.findMany({
      where: {
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!degreeProgram) {
      throw new NotFoundException("Data Fakultas Tidak Ditemukan!");
    }

    return { degree_program: degreeProgram };
  }

  async getFaculty({
    search,
    degree_program_id,
  }: ISelectFacultyRequest): Promise<TFacultyResponse> {
    const faculty = await this.prisma.faculty.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },

        ...(degree_program_id && {
          degreeProgram_id: Number(degree_program_id),
        }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!faculty) {
      throw new NotFoundException("Data Fakultas Tidak Ditemukan!");
    }

    return { faculty };
  }

  async getDepartment({
    search,
    faculty_id,
    degree_program_id,
  }: ISelectDepartmentRequest): Promise<TDepartmentResponse> {
    const department = await this.prisma.department.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(faculty_id && { faculty_id: Number(faculty_id) }),
        ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!department) {
      throw new NotFoundException("Data Program Studi Tidak Ditemukan!");
    }

    return { department };
  }

  async getReligion({ search }: ISelectRequest): Promise<TReligionResponse> {
    const religion = await this.prisma.religion.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!religion) {
      throw new NotFoundException("Data Religion Tidak Ditemukan!");
    }

    return { religion };
  }

  async getMaritalStatus({ search }: ISelectRequest): Promise<TMaritalStatusResponse> {
    const maritalStatus = await this.prisma.maritalStatus.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!maritalStatus) {
      throw new NotFoundException("Data Status Pernikahan Tidak Ditemukan!");
    }

    return { maritalStatus };
  }

  async getGender({ search }: ISelectRequest): Promise<TGenderResponse> {
    const gender = await this.prisma.gender.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!gender) {
      throw new NotFoundException("Data Gender Tidak Ditemukan!");
    }

    return { gender };
  }

  async getCitizenship({ search }: ISelectRequest): Promise<TCitizenshipResponse> {
    const citizenship = await this.prisma.citizenship.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!citizenship) {
      throw new NotFoundException("Data Kewarganegaraan Tidak Ditemukan!");
    }

    return { citizenship };
  }

  async getSelectionPath({ search }: ISelectRequest): Promise<TSelectionResponse> {
    const selection = await this.prisma.selectionPath.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!selection) {
      throw new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!");
    }

    return { selection };
  }

  async getSalary({ search }: ISelectRequest): Promise<TSalaryResponse> {
    const salary = await this.prisma.salary.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!salary) {
      throw new NotFoundException("Data Gaji Tidak Ditemukan!");
    }

    return { salary };
  }

  async getEducationHistory({
    search,
    npsn,
  }: ISelectEducationHistoryRequest): Promise<TEducationHistoryResponse> {
    const educationHistory = await this.prisma.educationHistory.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
        npsn: { ...(npsn && { contains: npsn }) },
      },
      select: {
        id: true,
        npsn: true,
        name: true,
        province: true,
        sub_district: true,
        district_city: true,
        street_address: true,
      },
    });

    if (!educationHistory || educationHistory.length === 0) {
      throw new NotFoundException("Data Pendidikan Tidak Ditemukan!");
    }

    return { education_history: educationHistory };
  }

  async getCountry({ search, citizenship_id }: ICountryRequest): Promise<TCountryResponse> {
    const country = await this.prisma.country.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(citizenship_id && { citizenship_id: Number(citizenship_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!country) {
      throw new NotFoundException("Data Negara Tidak Ditemukan!");
    }

    return { country };
  }

  async getOccupation({ search }: ISelectRequest): Promise<TOccupationResponse> {
    const occupation = await this.prisma.occupation.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
        occupationposition: true,
      },
    });
    if (!occupation) {
      throw new NotFoundException("Data Pekerjaan Tidak Ditemukan!");
    }

    return { occupation };
  }

  async getDisabilites({ search }: ISelectRequest): Promise<TDisabilitiesResponse> {
    const disabilities = await this.prisma.disabilities.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!disabilities) {
      throw new NotFoundException("Data Disabilitas Tidak Ditemukan!");
    }

    return { disabilities };
  }

  async getYearGraduate(): Promise<TYearGraduationResponse> {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 40;

    const year = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      const id = index + 1;
      return { id: +id, name: year };
    });

    return { year };
  }

  async getScholarship({ search }: ISelectRequest): Promise<TScholarshipResponse> {
    const scholarship = await this.prisma.scholarship.findMany({
      where: {
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return { scholarship };
  }
}

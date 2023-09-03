import {
  TTextFieldAyah,
  TTextFieldIbu,
  TTextFieldOne,
  TTextFieldThree,
  TTextFieldTwo,
} from "./type";

export const formBiodataOne: TTextFieldOne[] = [
  {
    name: "fullname",
    item: "Nama Lengkap",
    type: "text",
    placeholder: "Nama Lengkap",
  },
  {
    name: "phone_number",
    item: "Nomor Handphone/WA",
    type: "text",
    placeholder: "08123456789",
  },
];

export const formBiodataTwo: TTextFieldTwo[] = [
  {
    name: "rt",
    item: "RT",
    type: "text",
  },
  {
    name: "rw",
    item: "RW",
    type: "text",
  },
];

export const formBiodataThree: TTextFieldThree[] = [
  {
    name: "parent_rt",
    item: "RT",
    type: "text",
  },
  {
    name: "parent_rw",
    item: "RW",
    type: "text",
  },
];

export const formBioadataAyah: TTextFieldAyah[] = [
  {
    name: "father_education",
    item: "Pendidikan Ayah",
    type: "text",
    className: "w-70% lg:w-25% max-w-20% xl:w-20%",
  },
];

export const formBioadataIbu: TTextFieldIbu[] = [
  {
    name: "mother_education",
    item: "Pendidikan Ibu",
    type: "text",
    className: "w-70% lg:w-25% max-w-20% xl:w-20%",
  },
];

export const dataDiri = {
  fullname: "",
  nik: "",
  nisn: "",
  birth_place: "",
  birth_date: "",
  no_kk: "",
  gender_id: 1,
  religion_id: 0,
  citizenship_id: 0,
  marital_status_id: 0,
  country_id: 0,
  address: "",
  subdistrict_id: 0,
  province_id: 0,
  city_id: 0,
};

export const disabilitiesDataDiri = {
  disabilities_id: null as number | null,
};

export const occupationS2S3 = {
  occupation_id: 0,
  occupation_position_id: null as unknown as number,
  company_name: "",
  salary_id: 0,
  company_address: "",
};

export const dataPendidikan = {
  education_type_id: 0,
  graduation_year: "",
  education_major_id: 0,
  education_npsn: "",
};

export const studentParentData = {
  father_name: undefined,
  father_status_id: 0,
  father_education_id: 0,
  father_occupation_id: 0,
  father_position_id: 0,
  father_salary_id: 0,
  mother_name: undefined,
  mother_status_id: 0,
  mother_education_id: 0,
  mother_occupation_id: 0,
  mother_position_id: 0,
  mother_salary_id: 0,
  parent_address: undefined,
  parent_province_id: 0,
  parent_city_id: 0,
  parent_subdistrict_id: 0,
};

export const studentGuardianData = {
  guardian_name: undefined,
  guardian_status_id: 0,
  guardian_education_id: 0,
  guardian_occupation_id: 0,
  guardian_position_id: null as unknown as number,
  guardian_salary_id: 0,
  guardian_address: null,
  guardian_province_id: 0,
  guardian_city_id: 0,
  guardian_subdistrict_id: 0,
};

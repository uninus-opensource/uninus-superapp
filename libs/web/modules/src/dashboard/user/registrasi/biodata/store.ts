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
  avatar: null,
  email: "",
  fullname: "",
  nik: "",
  nisn: "",
  birth_place: "",
  birth_date: "",
  no_kk: "",
  gender_id: 1,
  phone_number: "",
  religion_id: 0,
  citizenship_id: 0,
  marital_status_id: 0,
  country_id: 0,
  address: "",
  subdistrict_id: 0,
  province_id: 0,
  city_id: 0,
  disabilities_id: null as number | null,
  occupation_id: 0,
  occupation_position_id: 0,
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

import { TBiodataRequest } from '@uninus/entities';
import {
  TTextFieldAyah,
  TTextFieldIbu,
  TTextFieldOne,
  TTextFieldThree,
  TTextFieldTwo,
} from './type';

export const formBiodataOne: TTextFieldOne[] = [
  {
    name: 'fullname',
    item: 'Nama Lengkap',
    type: 'text',
    placeholder: 'Nama Lengkap',
  },
  {
    name: 'phone_number',
    item: 'Nomor Handphone/WA',
    type: 'text',
    placeholder: '08123456789',
  },
];

export const formBiodataTwo: TTextFieldTwo[] = [
  {
    name: 'rt',
    item: 'RT',
    type: 'text',
  },
  {
    name: 'rw',
    item: 'RW',
    type: 'text',
  },
];

export const formBiodataThree: TTextFieldThree[] = [
  {
    name: 'parent_rt',
    item: 'RT',
    type: 'text',
  },
  {
    name: 'parent_rw',
    item: 'RW',
    type: 'text',
  },
];

export const formBioadataAyah: TTextFieldAyah[] = [
  {
    name: 'father_education',
    item: 'Pendidikan Ayah',
    type: 'text',
    className: 'w-70% lg:w-25% max-w-20% xl:w-20%',
  },
];

export const formBioadataIbu: TTextFieldIbu[] = [
  {
    name: 'mother_education',
    item: 'Pendidikan Ibu',
    type: 'text',
    className: 'w-70% lg:w-25% max-w-20% xl:w-20%',
  },
];

export const defaultValuesBiodata: TBiodataRequest = {
  avatar: undefined,
  email: '',
  fullname: '',
  nik: '',
  nisn: '',
  birth_place: '',
  birth_date: '',
  gender: 'MALE',
  phone_number: '',
  religion: 'ISLAM',
  citizenship: 'WNI',
  marital_status: '',
  country: '',
  address: '',
  postal_code: '',
  subdistrict: '',
  province: '',
  city: '',
  school_type: '',
  graduation_year: '',
  school_major: '',
  school_name: '',
  school_npsn: '',
  school_address: '',
  school_postal_code: '',
  school_subdistrict: '',
  school_province: '',
  school_city: '',
  school_phone_number: '',
  father_name: '',
  mother_name: '',
  guardian_name: '',
  father_status: '',
  mother_status: '',
  guardian_status: '',
  parent_address: '',
  parent_postal_code: '',
  parent_subdistrict: '',
  parent_province: '',
  parent_city: '',
  father_education: '',
  mother_education: '',
  guardian_education: '',
  father_occupation: '',
  mother_occupation: '',
  guardian_occupation: '',
  father_income: '',
  mother_income: '',
  guardian_income: '',
  guardian_address: '',
  guardian_postal_code: '',
  guardian_subdistrict: '',
  guardian_province: '',
  guardian_city: '',
  faculty_type: '',
  education_programs: '',
  study_program: '',
  selection_type: '',
  family_card: '',
  pass_photo: '',
  ktp_card: '',
  school_report_card: '',
  birth_certificate: '',
  additional_documents: '',
  ijazah_card: '',
  kipk_card: '',
  academic_year: '',
  registration_wave: '',
  registration_status: '',
};

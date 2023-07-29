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
  image: undefined,
  nik: '',
  fullname: '',
  email: '',
  identification_type: 'KTP',
  identification_number: '',
  nisn: '',
  phone_number: '',
  kk_number: '',
  birth_place: '',
  birth_date: '',
  EGender: 'MALE',
  EReligion: 'ISLAM',
  marital_status: '',
  ECitizenship: 'WNI',
  country: '',
  province: '',
  city: '',
  subdistrict: '',
  address: '',
  rt: '',
  rw: '',
  postal_code: '',
  school_type: '',
  school_major: '',
  school_name: '',
  npsn: '',
  school_address: '',
  school_province: '',
  school_city: '',
  school_subdistrict: '',
  school_postal_code: '',
  school_phone_number: '',
  graduation_year: '',
  mother_name: '',
  father_name: '',
  guardian_name: '',
  parent_address: '',
  parent_rt: '',
  parent_rw: '',
  parent_postal_code: '',
  parent_province: '',
  parent_phone_number: '',
  parent_subdistrict: '',
  parent_city: '',
  father_education: '',
  father_occupation: '',
  father_income: '',
  mother_education: '',
  mother_occupation: '',
  mother_income: '',
  guardian_education: '',
  guardian_city: '',
  guardian_province: '',
  guardian_subdistrict: '',
  guardian_address: '',
  guardian_postal_code: '',
  guardian_occupation: '',
  guardian_income: '',
  selection_type: '',
  program: '',
  academic_year: '',
  registration_wave: '',
};

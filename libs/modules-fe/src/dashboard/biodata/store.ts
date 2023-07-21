import { TBiodataRequest } from '@uninus/entities';
import { TTextFieldOne, TTextFieldThree, TTextFieldTwo } from './type';
import { useBiodataGet } from './hooks';
import { useMemo } from 'react';

export const formBiodataOne: TTextFieldOne[] = [
  {
    name: 'identification_number',
    item: 'Nomor Kartu Identitas',
    type: 'text',
  },
  {
    name: 'nisn',
    item: 'Nomor Induk Siswa Nasional',
    type: 'text',
  },
  {
    name: 'phone_number',
    item: 'Nomor Handphone/WA',
    type: 'text',
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

export const defaultValuesBiodata: TBiodataRequest = {
  image: '',
  nim: '',
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
  father_education: '',
  father_occupation: '',
  father_income: '',
  mother_education: '',
  mother_occupation: '',
  mother_income: '',
  guardian_education: '',
  guardian_occupation: '',
  guardian_income: '',
  selection_type: '',
  program: '',
  academic_year: '',
  registration_wave: '',
};

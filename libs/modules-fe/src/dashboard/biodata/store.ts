import { TTextFieldOne, TTextFieldThree, TTextFieldTwo } from './type';

export const formBiodataOne: TTextFieldOne[] = [
  {
    name: 'email',
    item: 'Email',
    type: 'text',
  },
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

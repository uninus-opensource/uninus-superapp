import { atom, selector } from 'recoil';
import { tableMagister, tableSarjana } from './types';

export const sarjanaSearch = atom({
  key: 'sarjana-query',
  default: '',
});

export const sarjanaFilter = selector({
  key: 'sarjana-filter',
  get: ({ get }) =>
    get(dataSarjana).filter(
      (data) =>
        data.fakultas
          .toLowerCase()
          .includes(get(sarjanaSearch).toLowerCase()) ||
        data.program_studi
          .toString()
          .toLowerCase()
          .includes(get(sarjanaSearch).toLowerCase())
    ),
});

export const dataSarjana = atom<tableSarjana[]>({
  key: 'data-sarjana-dummy',
  default: [
    {
      fakultas: 'Fakultas Teknik',
      program_studi: 'Informatika',
      ukt: '6.700.000',
    },
    {
      fakultas: 'Fakultas Pendidikan',
      program_studi: 'Matematika',
      ukt: '7.200.000',
    },
    {
      fakultas: 'Fakultas Perhutanan',
      program_studi: 'Sawit',
      ukt: '7.000.000',
    },
  ],
});

export const magisterSearch = atom({
  key: 'magister-query',
  default: '',
});

export const magisterFilter = selector({
  key: 'magister-filter',
  get: ({ get }) =>
    get(dataMagister).filter(
      (data) =>
        data.ukt.toLowerCase().includes(get(magisterSearch).toLowerCase()) ||
        data.program_studi
          .toString()
          .toLowerCase()
          .includes(get(magisterSearch).toLowerCase())
    ),
});

export const dataMagister = atom<tableMagister[]>({
  key: 'data-magister-dummy',
  default: [
    {
      program_studi: 'Magister Administrasi Pendidikan (S2)Informatika',
      ukt: '6.700.000',
    },
    {
      program_studi: 'Magister Pendidikan Agama Islam (S2)',
      ukt: '7.200.000',
    },
    {
      program_studi: 'Magister Ilmu Hukum (S2)',
      ukt: '7.000.000',
    },
  ],
});

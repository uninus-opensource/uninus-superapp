'use client';
import { ReactElement, FC } from 'react';
import { Button, SelectField, SelectOption } from '@uninus/web/components';

import { FieldValues, useForm } from 'react-hook-form';

export const ModulePendaftaran: FC = (): ReactElement => {
  const {
    control,
    formState: { isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      program: undefined,
      seleksi: undefined,
      prodi1: undefined,
      prodi2: undefined,
      fakultas: undefined,
      pembayaran: undefined,
      draggableComponent: undefined,
    },
  });

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <section
      key="dashboard-pendaftaran"
      className="flex flex-col text-center lg:px-10 px-4 gap-y-6  lg:text-start"
    >
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Pendaftaran</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl  font-bold text-secondary-green-4">
          Pendaftaran
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full bg-primary-white p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1 className="text-2xl font-bold">Formulir Pendaftaran</h1>
        <form action="submit" onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-4">
            <SelectField
              name="program"
              label="Program Pendidikan"
              size="md"
              placeholder="Pilih Program Pendidikan"
              status="none"
              options={[
                {
                  value: 'S1',
                  label: 'Program Sarjana(S1) 2023/2024',
                },
                {
                  value: 'S2',
                  label: 'Program Magister(S2) 2023/2024',
                },
                {
                  value: 'S3',
                  label: 'Program Doktor(S3) 2023/2024',
                },
              ]}
              control={control}
              required
            />
            <SelectOption
              name="fakultas"
              labels="Pilih Fakultas"
              placeholder="Pilih Fakultas"
              options={[
                {
                  value: 'FAI',
                  label: 'Fakultas Agama Islam (FAI)',
                },
                {
                  value: 'FKIP',
                  label: 'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
                },
                {
                  value: 'FTEK',
                  label: 'Fakultas Teknik (FTEK)',
                },
                {
                  value: 'FIKOM',
                  label: 'Fakultas Ilmu Komunikasi (FIKOM)',
                },
                {
                  value: 'FKON',
                  label: 'Fakultas Ekonomi (FKON)',
                },
                {
                  value: 'FHUM',
                  label: 'Fakultas Hukum (FHUM)',
                },
                {
                  value: 'FAPERTA',
                  label: 'Fakultas Pertanian (FAPERTA)',
                },
              ]}
              isSearchable={true}
              control={control}
              isMulti={false}
            />
            {/* <SelectField
              name="fakultas"
              label="Pilih Fakultas"
              size="md"
              placeholder="Pilih Fakultas"
              status="none"
              required
              options={[
                {
                  label: 'FAI',
                  value: 'Fakultas Agama Islam (FAI)',
                },
                {
                  label: 'FKIP',
                  value: 'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
                },
                {
                  label: 'FTEK',
                  value: 'Fakultas Teknik (FTEK)',
                },
                {
                  label: 'FIKOM',
                  value: 'Fakultas Ilmu Komunikasi (FIKOM)',
                },
                {
                  label: 'FKON',
                  value: 'Fakultas Ekonomi (FKON)',
                },
                {
                  label: 'FHUM',
                  value: 'Fakultas Hukum (FHUM)',
                },
                {
                  label: 'FAPERTA',
                  value: 'Fakultas Pertanian (FAPERTA)',
                },
              ]}
              control={control}
            /> */}
            <SelectField
              name="prodi1"
              label="Pilihan Program Studi 1"
              size="md"
              required
              placeholder="Pilih Program Studi"
              status="none"
              options={[
                {
                  label: 'PAI',
                  value: 'Pendidikan Agama Islam',
                },
                {
                  label: 'Bank',
                  value: 'Perbankan Syariah',
                },
                {
                  label: 'PG/SD',
                  value: 'Pendidikan Guru Madrasah ibtidaiyah',
                },
                {
                  label: 'KPI',
                  value: 'Komunikasi Penyiaran Islam',
                },
                {
                  label: 'PLB',
                  value: 'Pendidikan Luar Biasa (PLB)',
                },
                {
                  label: 'PLS',
                  value: 'Pendidikan Luar Sekolah (PLS)',
                },
                {
                  label: 'PG-PAUD',
                  value: 'Pendidikan Guru Pendidikan Anak Usia Dini(PG-PAUD)',
                },
                {
                  label: 'TE',
                  value: 'Teknik Elektronika',
                },
                {
                  label: 'TE',
                  value: 'Teknik Informatika',
                },
                {
                  label: 'TIS',
                  value: 'Teknik Industri',
                },
              ]}
              control={control}
            />
            <SelectField
              name="prodi2"
              label="Pilihan Program Studi 2"
              size="md"
              required
              placeholder="Pilih Program Studi"
              status="none"
              options={[
                {
                  label: 'PAI',
                  value: 'Pendidikan Agama Islam',
                },
                {
                  label: 'Bank',
                  value: 'Perbankan Syariah',
                },
                {
                  label: 'PG/SD',
                  value: 'Pendidikan Guru Madrasah ibtidaiyah',
                },
                {
                  label: 'KPI',
                  value: 'Komunikasi Penyiaran Islam',
                },
                {
                  label: 'PLB',
                  value: 'Pendidikan Luar Biasa (PLB)',
                },
                {
                  label: 'PLS',
                  value: 'Pendidikan Luar Sekolah (PLS)',
                },
                {
                  label: 'PG-PAUD',
                  value: 'Pendidikan Guru Pendidikan Anak Usia Dini(PG-PAUD)',
                },
                {
                  label: 'TE',
                  value: 'Teknik Elektronika',
                },
                {
                  label: 'TE',
                  value: 'Teknik Informatika',
                },
                {
                  label: 'TIS',
                  value: 'Teknik Industri',
                },
              ]}
              control={control}
            />
            <SelectField
              name="seleksi"
              label="Jalur Seleksi"
              size="md"
              placeholder="Pilih Jalur Seleksi"
              status="none"
              required
              options={[
                {
                  label: 'BNP',
                  value: 'Beasiswa Nusantara Berprestasi (BNP)',
                },
                {
                  label: 'SPA',
                  value: 'Seleksi Prestasi Akademik',
                },
                {
                  label: 'SPNA',
                  value: 'Seleksi Prestasi Non Akademik',
                },
                {
                  label: 'Banom',
                  value: 'Kerjasama Banom',
                },
                {
                  label: 'KIP',
                  value: 'KIP - KULIAH',
                },
              ]}
              control={control}
            />
          </div>
          <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-start">
            <Button
              variant="elevated"
              size="sm"
              width="w-48"
              height="h-12"
              disabled={!isValid}
              className={`${
                isValid ? 'bg-primary-green' : 'bg-slate-2 cursor-not-allowed'
              } text-white rounded-md`}
            >
              Daftar Sekarang
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

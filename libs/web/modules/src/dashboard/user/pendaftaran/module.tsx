'use client';
import { ReactElement, FC } from 'react';
import { Button, SelectField } from '@uninus/web/components';
import { DashboardLayout } from '@uninus/web/layouts';

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
    <DashboardLayout>
      <section className="flex flex-col text-center lg:px-10 px-4 gap-y-6  lg:text-start">
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
                  'Program Sarjana(S1) 2023/2024',
                  'Program Magister(S2) 2023/2024',
                  'Program Doktor(S3) 2023/2024',
                ]}
                control={control}
                required
              />
              <SelectField
                name="fakultas"
                label="Pilih Fakultas"
                size="md"
                placeholder="Pilih Fakultas"
                status="none"
                required
                options={[
                  'Fakultas Agama Islam (FAI)',
                  'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
                  'Fakultas Teknik (FTEK)',
                  'Fakultas Ilmu Komunikasi (FIKOM)',
                  'Fakultas Ekonomi (FKON)',
                  'Fakultas Hukum (FHUM)',
                  'Fakultas Pertanian (FAPERTA)',
                ]}
                control={control}
              />
              <SelectField
                name="prodi1"
                label="Pilihan Program Studi 1"
                size="md"
                required
                placeholder="Pilih Program Studi"
                status="none"
                options={[
                  'Pendidikan Agama Islam',
                  'Perbankan Syariah',
                  'Pendidikan Guru Madrasah ibtidaiyah',
                  'Komunikasi Penyiaran Islam',
                  'Pendidikan Luar Biasa (PLB)',
                  'Pendidikan Luar Sekolah (PLS)',
                  'Pendidikan Guru Pendidikan Anak Usia Dini(PG-PAUD)',
                  'Teknik Elektronika',
                  'Teknik Informatika',
                  'Teknik Industri',
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
                  'Pendidikan Agama Islam',
                  'Perbankan Syariah',
                  'Pendidikan Guru Madrasah ibtidaiyah',
                  'Komunikasi Penyiaran Islam',
                  'Pendidikan Luar Biasa (PLB)',
                  'Pendidikan Luar Sekolah (PLS)',
                  'Pendidikan Guru Pendidikan Anak Usia Dini(PG-PAUD)',
                  'Teknik Elektronika',
                  'Teknik Informatika',
                  'Teknik Industri',
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
                  'Beasiswa Nusantara Berprestasi (BNP)',
                  'Seleksi Prestasi Akademik',
                  'Seleksi Prestasi Non Akademik',
                  'Kerjasama Banom',
                  'KIP - KULIAH',
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
    </DashboardLayout>
  );
};

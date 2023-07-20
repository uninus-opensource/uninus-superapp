'use client';
import { ReactElement, FC } from 'react';
import { Button, SelectField } from '@uninus/components';
import { DashboardLayout } from '../../layouts';
import { useForm } from 'react-hook-form';

export const ModulePendaftaran: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      program: undefined,
      seleksi: undefined,
      prodi: undefined,
      fakultas: undefined,
      pembayaran: undefined,
    },
  });

  return (
    <DashboardLayout>
      <section className="flex flex-col text-center lg:px-10 px-4 gap-y-6  lg:text-start">
        <div className="2xl:text-2xl">
          <h1 className="text-slate-5">
            PMB <span className="text-secondary-green-4"> / Pendaftaran</span>
          </h1>
          <p className=" text-lg 2xl:text-2xl  font-bold text-secondary-green-4">
            Formulir Pendaftaran
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full bg-primary-white p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <SelectField
            name="program"
            label="Program"
            size="md"
            placeholder="Pilih Program Pendidikan"
            status="none"
            options={[
              'Program Sarjana(S1) 2023/2024',
              'Program Magister(S2) 2023/2024',
              'Program Doktor(S3) 2023/2024',
            ]}
            control={control}
          />
          <SelectField
            name="seleksi"
            label="Jalur Seleksi"
            size="md"
            placeholder="Pilih Jalur Seleksi"
            status="none"
            options={[
              'Beasiswa Nusantara Berprestasi (BNP)',
              'Seleksi Prestasi Akademik',
              'Seleksi Prestasi Non Akademik',
              'Kerjasama Banom',
              'KIP - KULIAH',
            ]}
            control={control}
          />
          <SelectField
            name="fakultas"
            label="Pilih Fakultas"
            size="md"
            placeholder="Pilih Fakultas"
            status="none"
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
            name="prodi"
            label="Pilih Program Studi"
            size="md"
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
          <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-start">
            <Button variant="elevated" size="sm" width="w-48" height="h-12">
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

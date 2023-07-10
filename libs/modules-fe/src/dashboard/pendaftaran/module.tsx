'use client';
import { ReactElement, FC } from 'react';
import { Button, SelectField } from '@uninus/components';
import { DashboardLayout } from '../../layouts';
import { useForm } from 'react-hook-form';

export const ModulePendaftaran: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      program: '',
      seleksi: '',
      prodi: '',
      fakultas: '',
      pembayaran: '',
    },
  });

  return (
    <DashboardLayout>
      <section className="flex flex-col gap-4 lg:px-10 lg:ml-[18%] ml-0 text-center lg:text-start">
        <h1 className="text-4xl font-bold pb-8">Pendaftaran</h1>
        <section className="w-full h-auto bg-primary-white p-8">
          <div className="flex flex-col gap-8">
            <SelectField
              name="program"
              label="Program"
              size="md"
              placeholder="Pilih Program Pendidikan"
              status="none"
              options={[
                'Program Sarjana(S1) 2023/2024',
                'Program Pascasarjana(S2) 2023/2024',
              ]}
              value="Pilihan Program"
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
              value="Jalur Seleksi"
              control={control}
            />
            <SelectField
              name="fakultas"
              label="Pilih Fakultas"
              size="md"
              placeholder="Pilih Fakultas"
              status="none"
              options={[
                'Fakultas Agama Islam',
                'Faklutas Keguruan dan Ilmu Pendidikan (FKIP)',
                'Faklutas Teknik (FTEK)',
                'Faklutas Ilmu Komunikasi (FIKOM)',
                'Faklutas Ekonomi (FKON)',
                'Faklutas Hukum (FHUM)',
                'Faklutas Pertanian (FAPERTA)',
              ]}
              value="Metode Pembayaran"
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
              value="Metode Pembayaran"
              control={control}
            />
            <Button variant="elevated" size="sm" width="w-48" height="h-12">
              Daftar Sekarang
            </Button>
          </div>
        </section>
        <h1 className="text-4xl font-bold py-12">Status Pendaftaran</h1>
      </section>
    </DashboardLayout>
  );
};

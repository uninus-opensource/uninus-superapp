'use client';
import { ReactElement, FC } from 'react';
import { Button, SelectField } from '@uninus/components';
import { DashboardLayout } from '../../layouts';
import { DraggableComponent } from '@uninus/components';
import { useForm } from 'react-hook-form';

export const ModulePendaftaran: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      program: undefined,
      seleksi: undefined,
      prodi: undefined,
      fakultas: undefined,
      pembayaran: undefined,
      draggableComponent: undefined,
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
            Pendaftaran
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full bg-primary-white p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <h1 className="text-2xl font-bold">Formulir Pendaftaran</h1>

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
          <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-start">
            <Button variant="elevated" size="sm" width="w-48" height="h-12">
              Daftar Sekarang
            </Button>
          </div>
        </div>
        <div className="flex gap-4 w-full bg-primary-white p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-col gap-4 w-1/2">
            <h1 className="text-2xl font-bold">Pembayaran Registrasi</h1>
            <div className="text-base font-bold">
              <h1>Nomor Virtual Account : </h1>
              <p>903107822105074011(bukan VA Asli)</p>
            </div>
            <div className="text-base font-bold">
              <h1>
                Nomor Registrasi : <span>662346xxxxx</span>{' '}
              </h1>
              <p>
                Biaya : <span>Rp. 250.000</span>
              </p>
            </div>
            <div className="text-base ">
              <p>
                Waktu Registrasi : <span>26/07/2023</span>{' '}
              </p>
              <p>
                Program Pendidikan : <span>Program Sarjana S1 2023/2024</span>
              </p>
              <p>
                Jalur Seleksi : <span>Sistem Prestasi Akademik (SPA)</span>
              </p>
            </div>
            <div className="flex flex-col gap-8 w-full items-center mt-4 lg:items-start">
              <Button variant="elevated" size="sm" width="w-2/3" height="h-12">
                Sudah Melakukan Pembayaran
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/2 mb-8">
            <h1 className="text-base font-bold">Upload Bukti Pembayaran</h1>
            <DraggableComponent
              name={'dragable'}
              control={control}
              labels="Upload Bukti Pembayaran Disini"
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

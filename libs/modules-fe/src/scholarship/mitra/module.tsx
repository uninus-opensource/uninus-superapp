'use client';
import { ReactElement, FC } from 'react';
import { Button, HeroBanner } from '@uninus/components';
import Image from 'next/image';
import { MainLayout } from '../../layouts';

export const ModuleMitra: FC = (): ReactElement => {
  return (
    <MainLayout>
      <section className="w-full min-h-screen">
        <HeroBanner heroImages="/illustrations/beasiswa3.svg" />
        <section className="w-full lg:px-16 px-8 lg:py-8 py-4 flex flex-col gap-y-14">
          <div className="text-center flex flex-col gap-y-8">
            <h1 className="lg:text-3xl text-lg font-bold text-secondary-green-4 uppercase">
              beasiswa mitra nusantara
            </h1>
            <p className="lg:text-lg text-sm lg:w-4/5 w-full mx-auto lg:px-16 px-4">
              Beasiswa ini diperuntukan bagi Orang Tua Siswa salah satu anggota
              NU dan Orang Tua Berprofesi sebagai Guru SMA/SMK/MAN/PONPES
            </p>
          </div>

          <div className="w-full flex lg:flex-row md:flex-row flex-col justify-between h-auto">
            <figure className="lg:absolute flex px-6 right-12">
              <Image
                src={'/illustrations/beasiswa3.svg'}
                alt="Beasiswa Mitra"
                width={400}
                height={400}
                priority
              />
            </figure>
            <div className="flex flex-wrap flex-col w-full justify-center lg:text-left text-center py-16 lg:pl-16 pl-0 gap-y-6 h-full">
              <div className="pt-8">
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                  Persyaratan Umum
                </h2>
                <ul className="list-decimal list-inside">
                  <li>Siswa Lulusan 2021, 2022, dan 2023</li>
                  <li>
                    Memenuhi salah satu kriteria dibawah ini :
                    <ul className="list-inside px-5">
                      <li>
                        a. <b>Anak kandung guru</b> atau anggota NU Se-jawa
                        barat{' '}
                      </li>
                      <li>
                        b. Rata-rata nilai 70 untuk tiga mata pelajaran yaitu :
                      </li>
                      <ul className="pl-4 font-semibold">
                        <li>Matematika</li>
                        <li>Bahasa Inggris</li>
                        <li>Bahasa Indonesia</li>
                      </ul>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                  Benefit
                </h2>
                <p>Potongan 20% UKT Semester 1</p>
              </div>
              <div>
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                  Periode Pendaftaran
                </h2>
                <p>1 Januari - 31 Maret 2023</p>
              </div>
              <div className="flex w-full lg:justify-start justify-center">
                <Button variant="elevated" size="sm" width="w-48" height="h-12">
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

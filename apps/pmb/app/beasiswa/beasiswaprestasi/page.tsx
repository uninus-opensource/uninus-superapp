'use client';
import { ReactElement } from 'react';
import { NextPage } from 'next';
import { Button, HeroBanner } from '@uninus/components';
import Image from 'next/image';
import MainLayout from '../../layouts/MainLayout';

const BeasiswaPrestasi: NextPage = (): ReactElement => {
  return (
    <MainLayout>
      <section className="w-full min-h-screen">
        <HeroBanner heroImages="/illustrations/beasiswa2.svg" />

        <section className="w-full lg:px-16 px-8 lg:py-8 py-4 flex flex-col gap-y-14">
          <div className="text-center flex flex-col gap-y-8">
            <h1 className="lg:text-3xl text-2xl font-bold text-secondary-green-4 uppercase">
              beasiswa nusantara berprestasi
            </h1>
            <p className="lg:text-lg text-sm lg:w-4/5 w-full mx-auto lg:px-16 px-4">
              Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang
              Akademik maupun Non Akademik
            </p>
          </div>

          <div className="w-full flex lg:flex-row flex-col justify-between h-auto py-8">
            <figure className="lg:absolute flex px-6 right-12">
              <Image
                src={'/illustrations/beasiswa2.svg'}
                alt="Beasiswa prestasi"
                width={400}
                height={400}
                priority
              />
            </figure>
            <div className="flex flex-wrap flex-col w-full justify-center lg:text-left text-center py-16 lg:pl-16 pl-0 gap-y-6 h-full">
              <div className="">
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                  Persyaratan Umum
                </h2>
                <ul className="list-decimal list-inside">
                  <li>Siswa Lulusan 2021, 2022, dan 2023</li>
                  <li>
                    Memiliki Salah satu prestasi berikut :
                    <ul className="list-inside px-5">
                      <li>a. Nilai rata-rata rapor : 80 </li>
                      <li>b. Nilai UTBK : 500 </li>
                      <li>
                        c. Minimal Juara 3 pada kejuaaraan tingkat nasional
                        (perorangan/tim){' '}
                      </li>
                      <li>d. Tahfidz Quran minimal 3 juz </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                  Benefit
                </h2>
                <p>Potongan 25% UKT Semester 1</p>
              </div>
              <div>
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                  Periode Pendaftaran
                </h2>
                <p>1 Januari s.d 31 Maret 2023</p>
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

export default BeasiswaPrestasi;

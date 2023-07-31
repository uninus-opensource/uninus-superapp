'use client';
import { ReactElement, FC, Fragment } from 'react';
import { Button, Footer, HeroBanner, Navbar } from '@uninus/web/components';
import Image from 'next/image';

export const ModulePrestasi: FC = (): ReactElement => {
  return (
    <Fragment>
      <Navbar />
      <section className="w-full min-h-screen">
        <Image
          src="/illustrations/beasiswa-prestasi.webp"
          alt=""
          width={100}
          height={100}
          layout="responsive"
          style={{ marginTop: '100px' }}
        />

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

          <div className="w-full flex lg:flex-row-reverse  md:flex-row-reverse flex-col justify-between md:items-start ">
            <figure className=" flex px-6  w-full">
              <Image
                src={'/illustrations/beasiswa2.webp'}
                alt="Beasiswa prestasi"
                width={400}
                height={100}
                priority
              />
            </figure>
            <div className="flex flex-wrap flex-col w-full justify-center md:text-left lg:text-left text-center py-16 md:pb-16 md:py-0 lg:pl-16 pl-0 gap-y-6 h-full">
              <div className=" text-left">
                <h2 className="text-secondary-green-1 text-lg font-semibold mb-4 text-center md:text-left">
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
                        c. Minimal Juara 3 pada kejuaraan tingkat daerah atau
                        provinsi (perorangan/tim){' '}
                      </li>
                      <li>d. Tahfidz Qur'an minimal 3 juz </li>
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
                <p>1 Januari s.d 31 Mei 2023</p>
              </div>
              <div className="flex w-full lg:justify-start justify-center md:justify-start">
                <Button
                  variant="elevated"
                  size="sm"
                  width="w-48"
                  height="h-12"
                  href="/auth/register"
                >
                  Daftar
                </Button>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </Fragment>
  );
};

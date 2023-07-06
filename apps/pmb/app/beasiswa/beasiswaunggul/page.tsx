'use client';
import { ReactElement } from 'react';
import { NextPage } from 'next';
import { Button, HeroBanner } from '@uninus/components';
import beasiswa1 from '../../illustrations/beasiswaunggul.svg';
import Image from 'next/image';

const BeasiswaUnggul: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen">
      <HeroBanner heroImages="../beasiswaunggul.svg" />

      <section className="w-full px-16 py-8 flex flex-col gap-y-14">
        <div className="text-center flex flex-col gap-y-8">
          <h1 className="text-3xl font-bold text-secondary-green-4 uppercase">
            beasiswa nusantara unggul
          </h1>
          <p className="text-lg w-4/5 mx-auto px-16">
            Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang Akademik
            maupun Non Akademik
          </p>
        </div>

        <div className="w-full flex justify-between h-full">
          <div className="pl-16 flex flex-wrap flex-col gap-y-6 h-screen">
            <div className="">
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                Persyaratan Umum
              </h2>
              <ul className="list-decimal list-inside">
                <li>Siswa Lulusan 2021, 2022, dan 2023</li>
                <li>
                  Nilai rata-rata rapor {'>'} 85 dan UTBK {'>'} 575
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                Benefit
              </h2>
              <p>Potongan 50% UKT Semester 1</p>
            </div>
            <div>
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                Periode Pendaftaran
              </h2>
              <p>1 Januari - 31 Maret 2023</p>
            </div>
            <div className="w-48">
              <Button variant="elevated" size="sm" width="w-full" height="h-12">
                Daftar
              </Button>
            </div>
          </div>
          <figure className="">
            <Image src={beasiswa1} alt="Beasiswa Unggul" width={400} />
          </figure>
        </div>
      </section>
    </section>
  );
};

export default BeasiswaUnggul;

'use client';
import { ReactElement } from 'react';
import { NextPage } from 'next';
import { Button, HeroBanner } from '@uninus/components';
import beasiswa3 from '../../illustrations/beasiswa3.svg';
import Image from 'next/image';

const BeasiswaMitra: NextPage = (): ReactElement => {
  return (
    <section className="w-full min-h-screen">
      <HeroBanner heroImages="../beasiswa3.svg" />

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
                  Memenuhi salah satu kriteria dibawah ini :
                  <ul className="list-inside px-5">
                    <li>a. Anak kandung guru atau anggota NU Se-jawa barat </li>
                    <li>
                      b. Rata-rata nilai 70 untuk tiga mata pelajaran yaitu :
                    </li>
                    <ul className="pl-4">
                      <li>
                        <b>Matematika</b>
                      </li>
                      <li>
                        <b>Bahasa Inggris</b>
                      </li>
                      <li>
                        <b>Bahasa Indonesia</b>
                      </li>
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
            <div className="w-48">
              <Button variant="elevated" size="sm" width="w-full" height="h-12">
                Daftar
              </Button>
            </div>
          </div>
          <figure className="">
            <Image src={beasiswa3} alt="Beasiswa Unggul" width={400} />
          </figure>
        </div>
      </section>
    </section>
  );
};

export default BeasiswaMitra;

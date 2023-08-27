"use client";
import { ReactElement, FC, Fragment, useEffect } from "react";
import { Button } from "@uninus/web/components";
import Image from "next/image";

export const ModuleMitra: FC = (): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 1000);
  }, []);

  return (
    <Fragment key="beasiswa-mitra">
      <section className="w-full lg:px-16 px-8 lg:py-8 py-4 flex flex-col gap-y-14">
        <div className="text-center flex flex-col gap-y-8">
          <h1 className="lg:text-3xl text-lg font-bold text-secondary-green-4">
            Beasiswa Mitra Nusantara
          </h1>
          <p className="lg:text-lg text-sm lg:w-4/5 w-full mx-auto lg:px-16 px-4">
            Beasiswa ini diperuntukan bagi Orang Tua Siswa salah satu anggota NU dan Orang Tua
            Berprofesi sebagai Guru SMA/SMK/MAN/PONPES
          </p>
        </div>

        <div className="w-full flex lg:flex-row-reverse  md:flex-row-reverse flex-col justify-between md:items-start ">
          <figure className="flex justify-center px-6 xl:ml-[20vw] w-full">
            <Image
              src={"/illustrations/beasiswaIllustrations/nusantara-mitra.webp"}
              alt="Beasiswa Mitra"
              width={400}
              height={100}
              priority
              quality={100}
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
                  Memenuhi salah satu kriteria dibawah ini :
                  <ul className="list-inside px-5">
                    <li>
                      a. <b>Anak guru</b> SMA/SMK/MAN/PONPES atau anggota NU Se-jawa barat{" "}
                    </li>
                    <li>b. Rata-rata nilai 80 untuk tiga mata pelajaran yaitu :</li>
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
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">Benefit</h2>
              <p>Potongan 20% UKT Semester 1</p>
            </div>
            <div>
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-4">
                Periode Pendaftaran
              </h2>
              <p>1 Januari - 31 Agustus 2023</p>
            </div>
            <div className="flex w-full lg:justify-start justify-center md:justify-start">
              <Button variant="elevated" size="sm" width="w-48" height="h-12" href="/auth/register">
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

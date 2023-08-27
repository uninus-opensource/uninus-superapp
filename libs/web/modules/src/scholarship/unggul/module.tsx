"use client";
import { ReactElement, FC, Fragment } from "react";
import { Button } from "@uninus/web/components";
import Image from "next/image";

export const ModuleUnggul: FC = (): ReactElement => {
  return (
    <Fragment key="beasiswa-unggul">
      <section className="w-full lg:px-16 px-8 lg:py-8 py-4 flex flex-col gap-y-14">
        <div className="text-center flex flex-col gap-y-8">
          <h1 className="lg:text-3xl text-2xl font-bold text-secondary-green-4">
            Beasiswa Nusantara Unggul
          </h1>
          <p className="lg:text-lg text-sm lg:w-4/5 w-full mx-auto lg:px-16 px-4">
            Beasiswa ini diperuntukan untuk Siswa Berprestasi di Bidang Akademik maupun Non Akademik
          </p>
        </div>

        <div className="w-full flex lg:flex-row-reverse items-center  md:flex-row-reverse flex-col justify-between md:items-start ">
          <figure className="flex justify-center px-6 xl:ml-[20vw] w-full">
            <Image
              src={"/illustrations/beasiswaIllustrations/nusantara-unggul.webp"}
              alt="Beasiswa Unggul"
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
                  Nilai rata-rata rapor {">"} 85 dan UTBK {">"} 575
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-2">Benefit</h2>
              <p>Potongan 50% UKT Semester 1</p>
            </div>
            <div>
              <h2 className="text-secondary-green-1 text-lg font-semibold mb-2">
                Periode Pendaftaran
              </h2>
              <p>1 Januari - 31 Maret 2023</p>
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

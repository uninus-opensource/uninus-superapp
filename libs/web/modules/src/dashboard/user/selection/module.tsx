"use client";
import { FC, ReactElement } from "react";
import { Button } from "@uninus/web/components";
import Image from "next/image";
export const ModuleSelectionTest: FC = (): ReactElement => {
  return (
    <section className="flex flex-col w-full h-auto justify-center items-center ">
      {/* header */}
      <div className="w-[80%] lg:w-full flex flex-col justify-start items-start">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Seleksi Test</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Seleksi Test</p>
      </div>

      {/* body */}
      <div className="w-[80%] lg:w-full rounded-lg h-auto md:h-[30rem] lg:h-[27rem] xl:h-[75vh] xl:w-full bg-primary-white  2xl:w-full 2xl:h-[84vh] flex flex-col md:flex-row items-center ">
        <div className="w-full relative h-full flex items-center justify-center flex-col">
          <figure className="relative">
            <Image
              src={"/illustrations/testseleksi.webp"}
              alt="home"
              width={292}
              height={292}
              quality={100}
              priority
              className="w-[120px] h-[120px] md:w-[250px] md:h-[250px] 2xl:w-[350px] 2xl:h-[350px] object-cover"
            />
          </figure>
          <div className="text-center">
            <h1 className="text-xl lg:text-3xl xl:text-4xl 2xl:text-4xl text-primary-green font-black uppercase">
              Seleksi Test
            </h1>
            <h2 className="text-medium md:text-lg lg:text-xl xl:text-3xl 2xl:text-3xl  text-primary-green font-black">
              PMB Universitas Islam Nusantara
            </h2>
            <p className="py-2 text-sm lg:text-medium 2xl:text-lg">
              Raih Mimpimu Bersama Universitas Islam Nusantara
            </p>
          </div>
          <h2 className="py-3 font-bold text-sm md:text-medium 2xl:text-lg">
            Waktu Test : 60 Menit
          </h2>
          <Button
            variant="filled"
            size="md"
            styling="mt-2 p-2 text-sm md:text-medium 2xl:text-lg 2xl:p-6"
            href="/dashboard/selection/intruction"
          >
            Mulai Test Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
};

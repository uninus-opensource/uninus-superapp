'use client';
import { ReactElement, FC } from 'react';
import Image from 'next/image';
import { ArrowLine } from '@uninus/web/components';

export const DashboardModule: FC = (): ReactElement => {
  return (
    <section className="flex flex-col w-screen lg:w-[68vw] h-auto justify-center items-center ">
      {/* header */}
      <div className="w-[80%] lg:w-full flex flex-col justify-start items-start">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Beranda</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">
          Beranda
        </p>
      </div>

      {/* body */}
      <div className="w-[80%] lg:w-full rounded-lg h-auto md:h-[30rem] lg:h-[27rem] xl:h-[29.5rem] bg-primary-white flex flex-col md:flex-row items-center ">
        <div className=" md:w-[50%] xl:w-[45%]">
          {/* Image */}
          <figure className=" grid place-items-center ">
            <Image
              src={'/illustrations/dashboard-home.webp'}
              alt="home"
              width={292}
              height={292}
              quality={100}
              priority
              className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] object-cover"
            />
          </figure>

          {/* heading */}
          <div className="flex flex-col gap-1 justify-center items-center w-full shadow-[0px_4px_8px_0px_rgba(0, 0, 0, 0.1)] text-center ">
            <h1 className="text-[17px] text-primary-green font-bold  w-full">
              Selamat Datang Di Dashboard PMB Universitas Islam Nusantara
            </h1>
            <div className=" w-full">
              <h2 className="font-semibold text-[12px] lg:text-base xl:text-lg">
                Untuk melakukan pendaftaran dapat mengikuti tata cara berikut :
              </h2>
            </div>
          </div>
        </div>

        {/* flow register */}
        <div className=" md:w-[50%] xl:w-[55%] xl:h-full  xl:grid place-items-center">
          <div className=" w-full h-[23rem] flex flex-col justify-center items-center">
            <div className="w-[80%] h-[3.5rem] xl:h-[5rem] bg-primary-white shadow-[0px_1px_1px_0px_#000005] grid place-items-center">
              <div className="w-[80%] grid place-items-center">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Langkah Pertama :
                  </span>{' '}
                  <br />
                  Mengisi formulir pendaftaran di halaman
                  <span className="text-primary-green font-bold">
                    {' '}
                    pendaftaran.
                  </span>
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[80%] h-[3.5rem] xl:h-[5rem] bg-primary-white shadow-[0px_1px_1px_0px_#000005] grid place-items-center">
              <div className="w-[80%]  grid place-items-center">
                <h1 className="text-grayscale-9 text-[7.5px] md:text-[8px] xl:text-[10.8px]">
                  <span className="text-primary-green font-bold text-[9px] md:text-[10px] xl:text-[12px]">
                    Langkah Kedua :
                  </span>{' '}
                  <br />
                  Langkah Kedua : Mengisi data diri, data pendidikan, data orang
                  tua di halaman
                  <span className="text-primary-green font-bold">
                    {' '}
                    Data Diri{' '}
                  </span>
                  dan melakukan pembayaran.
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[80%] h-[3.5rem] xl:h-[5rem] bg-primary-white shadow-[0px_1px_1px_0px_#000005] grid place-items-center">
              <div className="w-[80%]  grid place-items-center">
                <h1 className="text-grayscale-9 text-[7.3px] md:text-[9px] xl:text-[11px] text-justify">
                  <span className="text-primary-green font-bold text-[9.5px] md:text-[10px] xl:text-[12px]">
                    Langkah Ketiga :{' '}
                  </span>
                  <br />
                  Selanjutnya
                  <span className="text-primary-green font-bold">
                    {' '}
                    Upload Berkas{' '}
                  </span>
                  untuk melengkapi persyaratan umum & khusus.
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[80%] h-[3.5rem] xl:h-[5rem] bg-primary-white shadow-[0px_1px_1px_0px_#000005] grid place-items-center">
              <div className="w-[80%]  grid place-items-center">
                <h1 className="text-primary-green text-center text-[11px] xl:text-[14px] font-extrabold">
                  Pendaftaran PMB UNINUS selesai, dan menunggu hasil seleksi
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

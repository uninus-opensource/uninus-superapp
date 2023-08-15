"use client";
import { ReactElement, FC } from "react";
import Image from "next/image";
import { ArrowLine } from "@uninus/web/components";

export const DashboardModule: FC = (): ReactElement => {
  return (
    <section key="beranda" className="flex flex-col text-center px-4 gap-y-6  lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Beranda</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">Beranda</p>
      </div>

      {/* body */}
      <div className="flex lg:flex-row md:flex-row sm:flex-col gap-4 w-full bg-primary-white p-4 rounded-lg shadow-lg ">
        <div className="flex flex-col md:w-[50%] sm:w-full pb-20 pl-8 items-center justify-center">
          {/* Image */}
          <figure className=" grid place-items-center ">
            <Image
              src={"/illustrations/dashboard-home.webp"}
              alt="home"
              width={292}
              height={300}
              quality={100}
              priority
              className="w-[120px] h-[120px] md:w-[200px] md:h-[200px] pl-8 object-cover"
            />
          </figure>

          {/* heading */}
          <div className="flex flex-col gap-1 justify-center items-center w-full text-center ">
            <h1 className="text-[20px] text-primary-green font-bold  w-full">
              Selamat Datang Di Dashboard PMB Universitas Islam Nusantara
            </h1>
            <div className=" w-full">
              <h2 className="text-[12px] lg:text-base ">
                Untuk melakukan pendaftaran dapat mengikuti tata cara berikut :
              </h2>
            </div>
          </div>
        </div>

        {/* flow register */}
        <div className=" md:w-[50%] sm:w-full xl:w-[55%] h-auto xl:grid place-items-center">
          <div className=" w-full h-auto flex flex-col justify-center items-center">
            <div className="w-[300px] h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="w-[80%] grid place-items-center p-4">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-semibold md:text-[11px] xl:text-[13px]">
                    Halaman Formulir :
                  </span>{" "}
                  <br />
                  Mengisi formulir pendaftaran di halaman
                  <span className="text-primary-green font-bold"> ini.</span>
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[300px] h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="w-[80%] grid place-items-center p-4">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-semibold md:text-[11px] xl:text-[13px]">
                    Halaman Registrasi :
                  </span>{" "}
                  <br />
                  Mengisi semua data registrasi yang diperlukan, dan melakukan pembayaran.
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[300px] h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="w-[80%] grid place-items-center p-4">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Halaman Upload Berkas :
                  </span>{" "}
                  <br />
                  Selanjutnya <span className="text-primary-green font-bold">
                    {" "}
                    Upload Berkas
                  </span>{" "}
                  untuk melengkapi persyaratan yang ditentukan.
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[300px] h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="w-[80%] grid place-items-center p-4">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Halaman Tes Seleksi :
                  </span>{" "}
                  <br />
                  Mengikuti Tes seleksi apabila memilih jalur seleksi test.
                </h1>
              </div>
            </div>
            <ArrowLine />
            <div className="w-[300px] h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="w-[80%] grid place-items-center p-4">
                <h1 className="text-grayscale-9 text-[9.5px] text-center md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green  font-bold md:text-[11px] xl:text-[13px]">
                    Pendaftaran PMB UNINUS selesai, dan menunggu hasil seleksi
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";
import { ReactElement, FC } from "react";
import Image from "next/image";
import { ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export const DashboardModule: FC = (): ReactElement => {
  return (
    <section key="beranda" className="flex flex-col text-center px-4 gap-y-6  lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Beranda</span>
        </h1>
        <p className=" text-lg 2xl:text-2xl pt-2 font-extrabold text-secondary-green-4">Beranda</p>
      </div>
      <div className="flex w-full h-[150px] bg-[#FBFDE9] rounded-md p-4">
        <Image
          src={"/illustrations/warning.svg"}
          width={200}
          height={100}
          priority
          quality={100}
          alt={"neo-uninus"}
          className="w-30 p-4"
        />
        <div>
          <h1 className="font-bold">PERINGATAN</h1>
          <p className="text-sm">
            Untuk mempermudah proses PMB, harap mempersiapkan dokumen - dokumen berikut:
            <br />
            S1 : Ijazah, Akte, Ktp, KK <br />
            S2 : Ijazah S1, Ktp, KK, Porlap dikti, Transkip nilai S1 <br />
            S3 : Ijazah S2, Ktp, KK, Porlap dikti, Transkip nilai S2
          </p>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col gap-4 w-full bg-primary-white p-4 rounded-lg shadow-lg ">
        <div className="flex flex-col justify-start w-full text-left px-12 ">
          <h1 className="text-[20px] text-primary-green font-bold  w-full">
            Selamat Datang Di Dashboard PMB <br /> Universitas Islam Nusantara
          </h1>{" "}
          <p className=" text-sm py-2">
            Untuk melakukan pendaftaran dapat mengikuti tata cara berikut :
          </p>
        </div>

        {/* flow register */}
        <div className=" md:w-[50%] sm:w-full lg:w-full h-auto px-12">
          <div className=" w-full flex justify-between xl:flex-row items-center p-4 gap-4">
            <div className="lg:w-[300px] md:w-[300px] w-full h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="flex text-left lg:w-[80%] w-full lg:p-4 p-2">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Halaman Formulir :
                  </span>{" "}
                  <br />
                  Mengisi formulir pendaftaran di halaman
                  <span className="text-primary-green font-bold"> ini.</span>
                </h1>
              </div>
            </div>
            <div className="text-primary-green">
              <ArrowRightOutlined />
            </div>
            <div className="lg:w-[300px] md:w-[300px] w-full h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="flex text-left lg:w-[80%] w-full lg:p-4 p-2">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Halaman Registrasi :
                  </span>{" "}
                  <br />
                  Mengisi semua data registrasi yang diperlukan.
                </h1>
              </div>
            </div>
          </div>
          <div className="flex pr-40 text-primary-green w-full justify-end">
            <ArrowDownOutlined />
          </div>

          <div className=" w-full justify-between xl:flex-row items-center flex p-4 gap-4">
            <div className="lg:w-[300px] md:w-[300px] w-full h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="flex text-left lg:w-[80%] w-full lg:p-4 p-2">
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
            <div className="text-primary-green">
              <ArrowLeftOutlined />
            </div>
            <div className="lg:w-[300px] md:w-[300px] w-full h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="flex text-left lg:w-[80%] w-full lg:p-4 p-2">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Melakukan Pembayaran :
                  </span>{" "}
                  <br />
                  Setelah semua tahap dilakukan, segera lakukan pembayaran registrasi
                </h1>
              </div>
            </div>
          </div>
          <div className="text-primary-green pl-40">
            <ArrowDownOutlined />
          </div>

          <div className=" w-full justify-between items-center flex p-4 gap-4">
            <div className="lg:w-[300px] md:w-[300px] w-full h-auto bg-primary-white shadow-md grid place-items-start">
              <div className="flex text-left lg:w-[80%] w-full lg:p-4 p-2">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className="text-primary-green font-bold md:text-[11px] xl:text-[13px]">
                    Halaman Tes Seleksi :
                  </span>{" "}
                  <br />
                  Mengikuti Tes seleksi apabila memilih jalur seleksi test.
                </h1>
              </div>
            </div>
            <div className="text-primary-green">
              <ArrowRightOutlined />
            </div>
            <div className="lg:w-[300px] md:w-[300px] w-full h-auto bg-primary-green shadow-md grid justify-center">
              <div className="flex text-center w-full lg:p-4 p-2">
                <h1 className="text-grayscale-9 text-[9.5px] md:text-[10px] xl:text-[12px]">
                  <span className=" text-primary-white font-bold md:text-[11px] xl:text-[13px]">
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

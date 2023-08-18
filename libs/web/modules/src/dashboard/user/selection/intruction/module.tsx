"use client";
import { FC, ReactElement, useState } from "react";
import { Button } from "@uninus/web/components";
import { Modal } from "@uninus/web/components";
import { PiWarningCircleBold } from "react-icons/pi";
export const IntructionTestModule: FC = (): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(!showModal);
  return (
    <section key="intruction" className="flex flex-col w-full h-auto justify-center items-center ">
      {/* header */}
      <div className="w-[80%] lg:w-full flex flex-col justify-start items-start">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Seleksi Test</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Seleksi Test</p>
      </div>

      {/* body */}
      <div className="w-[80%] lg:w-full relative rounded-lg h-auto md:h-[30rem] lg:h-[27rem] xl:h-[83vh] xl:w-full bg-primary-white  2xl:w-full 2xl:h-[84vh] flex flex-col items-center lg:p-16 ">
        <div className="flex flex-col items-center gap-y-3">
          <h1 className="text-center text-primary-green text-3xl py-3 font-extrabold">
            Petunjuk Test
          </h1>
          <ul className="flex flex-col gap-y-4 list-decimal w-4/5">
            <li className="text-justify">
              <span className="font-bold text-primary-green">Pastikan Koneksi Internet Stabil</span>
              : Pastikan Anda terhubung ke internet dengan koneksi stabil sebelum memulai tes.
            </li>
            <li className="text-justify">
              <span className="font-bold text-primary-green">Waktu Terbatas</span> : Pastikan Anda
              menyelesaikan tes sesuai atau dibawah waktu yang ditentukan.
            </li>
            <li className="text-justify">
              <span className="font-bold text-primary-green">Submit Test</span> : Pastikan Anda
              menekan tombol “Selesaikan Tes” jika sudah menyelesaikan test/sebelum waktu test habis
            </li>
            <li className="text-justify">
              <span className="font-bold text-primary-green">Jujur dan Adil</span> : Ingat, tes ini
              dirancang untuk mengukur pengetahuan Anda secara adil. Jangan bekerjasama dengan pihak
              lain atau menggunakan bantuan apapun selama tes.
            </li>
          </ul>
          <h1 className="font-bold text-2xl text-primary-green">Selamat Mengerjakan</h1>
          <Button
            onClick={handleShowModal}
            variant="elevated"
            size="md"
            styling="mt-2 p-2 text-sm md:text-medium 2xl:text-lg  w-4/5"
          >
            Mulai Test
          </Button>
        </div>
        {showModal && (
          <Modal showModal={showModal} onClose={handleShowModal} iconClose={false}>
            <div className="flex flex-col justify-center items-center lg:flex lg:flex-row lg:py-10">
              <div className="txt mt-4 lg:mt-0">
                <div className="text-center flex flex-col items-center">
                  <PiWarningCircleBold className="text-red-6 text-center" size={120} />
                  <h1 className="font-extrabold text-3xl text-primary-black mb-2">Perhatian</h1>
                  <h1 className="text-primary-black">Apakah Anda yakin ingin mulai test?</h1>
                </div>
                <div className="flex gap-x-3 pt-4 justify-center">
                  <Button
                    variant="custom"
                    styling=" w-24 bg-primary-green text-primary-white font-semibold"
                    href="/dashboard/selection/quiz"
                  >
                    Iya
                  </Button>
                  <Button variant="green-outline" onClick={handleShowModal} styling="font-normal">
                    Kembali
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

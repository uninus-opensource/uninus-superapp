"use client";
import { ReactElement, FC, Fragment, useState } from "react";
import { Footer, HeroBanner, Modal, Navbar } from "@uninus/web/components";
import Image from "next/image";
import { ProdiList } from "./store";
import { ProdiProps } from "./type";
export const ProgramStudyModule: FC = (): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ProdiProps | null>(null);
  const handleOpenModal = (name: string) => {
    const selectedProdi = ProdiList.find((item) => item.name === name);
    setActiveItem(selectedProdi || null);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Fragment>
      <Modal
        showModal={showModal}
        onClose={handleCloseModal}
        iconClose={false}
        headerColor="bg-primary-green"
        modalTitle={
          <div className=" flex flex-row gap-x-2 items-center">
            <Image src="/illustrations/neo-uninus-2.webp" height={50} width={50} alt="logo" />
            <div className="flex flex-col text-sm">
              <p className="text-base text-primary-white">{activeItem?.name}</p>
              <p className="text-base text-primary-white">Universitas islam Nusantara</p>
            </div>
          </div>
        }
      >
        ini {activeItem?.name}
      </Modal>
      {showModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[9999]"
          onClick={handleCloseModal}
        />
      )}
      <Navbar />
      <section className="w-full min-h-screen">
        <HeroBanner
          heroImages="/illustrations/program-study.webp"
          heroTitleBottomRight="PROGRAM STUDI"
          backgrounColor="bg-grayscale-8"
          blur
        />
        <div className="lg:w-full w-auto h-full lg:p-16 py-16 px-8 text-center flex justify-center font-bebasNeue">
          <div className="flex flex-col lg:gap-y-16 lg:w-5/6 w-full gap-y-8">
            <div className="lg:w-4/5 w-full lg:mx-auto ">
              <h1 className="text-center text-secondary-green-5 lg:text-3xl text-lg font-bold">
                Fakultas dan Program studi Universitas Islam Nusantara
              </h1>
            </div>
          </div>
        </div>

        <section className="w-full h-full py-16 px-7">
          <div className="flex flex-wrap gap-y-8 lg:justify-between justify-center items-center ">
            {ProdiList.map((item, idx) => (
              <>
                <div
                  key={idx}
                  className="w-[265px] h-[180px] rounded overflow-hidden shadow-md relative"
                  onClick={() => {
                    setActiveItem(item);
                    handleOpenModal(item.name);
                  }}
                >
                  <Image src={item.img} width={265} height={180} alt={item.name} quality={100} />
                  <div className="absolute bottom-0 left-0 right-0 px-4 h-[30%] bg-secondary-green-4 flex justify-start items-center">
                    <div>
                      <h1 className="text-sm text-primary-white">{item.name}</h1>
                    </div>
                  </div>
                </div>
                {/* Modals */}
              </>
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </Fragment>
  );
};

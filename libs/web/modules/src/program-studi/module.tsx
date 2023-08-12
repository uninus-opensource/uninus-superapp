"use client";
import { ReactElement, FC, Fragment, useState } from "react";
import { Accordion, Button, Footer, HeroBanner, Modal, Navbar } from "@uninus/web/components";
import Image from "next/image";
import { ProdiList } from "./store";
import { ProdiProps } from "./type";
import { DownloadOutlined } from "@ant-design/icons";
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
        headerColor="bg-primary-green"
        footerColor="bg-primary-green"
        modalTitle={
          <div className=" flex flex-row gap-x-2 items-center">
            <Image src="/illustrations/uninus-logo.webp" height={70} width={70} alt="logo" />
            <div className="flex flex-col text-sm">
              <p className="text-base text-primary-white">{activeItem?.name}</p>
              <p className="text-sm text-primary-white">Universitas islam Nusantara</p>
            </div>
          </div>
        }
      >
        <div className="modal flex flex-col  h-full max-h-[50vh] overflow-y-auto overflow-hidden ">
          <h1 className="font-semibold py-5 text-xl">Visi</h1>
          {activeItem && <p className="text-justify">{activeItem.visi}</p>}
          <div className="prodi py-5">
            <div className="flex justify-between flex-row px-3">
              <p className="font-semibold">Nama Prodi</p>
              <p className="font-semibold">Akreditasi</p>
            </div>
            {activeItem && (
              <div className="flex flex-col justify-between items-center overflow-y-auto max-h-[40vh] overflow-hidden xl:w-full">
                {activeItem.prodi?.map((item, idx) => (
                  <Accordion showIcon={false} key={idx} title={item.prod} newIcon={item.akreditasi}>
                    <div className="p-5 lg:px-10">
                      <h1 className="font-bold text-xl text-primary-green pb-5">Deskripsi Prodi</h1>
                      <p className="text-sm text-justify">{item.about}</p>
                      <h1 className="font-bold text-xl text-primary-green py-5">Spesialisasi</h1>
                      <div className="pb-2 w-[90%] ">
                        <ul className=" list-disc md:grid md:grid-cols-2 flex flex-col  items-start justify-center ">
                          {item.specials?.map((item, idx) => (
                            <li key={idx} className="text-sm pl-2">
                              {item.special}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="filled" size="sm">
                        <div className="gap-2 flex justify-center items-center">
                          <DownloadOutlined /> Unduh Kurikulum
                        </div>
                      </Button>
                    </div>
                  </Accordion>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
      {showModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[50]"
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
        <div className="lg:w-full w-auto h-full lg:p-16 py-8 px-8 text-center flex justify-center font-bebasNeue">
          <div className="flex flex-col lg:gap-y-16 lg:w-5/6 w-full gap-y-8">
            <div className="lg:w-4/5 w-full lg:mx-auto ">
              <h1 className="text-center text-secondary-green-5 lg:text-3xl text-lg font-bold">
                Fakultas dan Program studi Universitas Islam Nusantara
              </h1>
            </div>
          </div>
        </div>

        <section className="w-full h-full py-8 px-7">
          <div className="flex flex-wrap lg:grid lg:grid-cols-3 gap-8 justify-center items-center">
            {ProdiList.map((item, idx) => (
              <div
                key={idx}
                className={`w-[265px]  h-[180px] rounded overflow-hidden shadow-md relative cursor-pointer ${
                  idx === ProdiList.length - 1 ? "col-span-2 lg:w-[595px]" : "col-span-1  "
                }`}
                onClick={() => {
                  setActiveItem(item);
                  handleOpenModal(item.name);
                }}
              >
                <div className=" hidden lg:block lg:mb-[4rem] ">
                  <Image
                    src={`${
                      idx === ProdiList.length - 1 ? "/illustrations/pasca-2.png " : item.img
                    }`}
                    width={595}
                    height={360}
                    alt={item.name}
                    quality={100}
                  />
                </div>
                <div className="block lg:hidden">
                  <Image src={item.img} width={530} height={360} alt={item.name} quality={100} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 h-[34%] bg-secondary-green-4 flex justify-start items-center">
                  <div>
                    <h1 className="text-sm text-primary-white">{item.name}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </Fragment>
  );
};

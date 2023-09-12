"use client";
import { ReactElement, FC, Fragment, useState, SetStateAction } from "react";
import {
  Accordion,
  Button,
  Footer,
  HeroBanner,
  Modal,
  Navbar,
  SearchInput,
} from "@uninus/web/components";
import Image from "next/image";
import { ProdiList } from "./store";
import { ProdiProps } from "./type";
import { DownloadOutlined } from "@ant-design/icons";
export const ProgramStudyModule: FC = (): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ProdiProps | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredDataAkun = ProdiList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prodi[0].prod.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

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
        closeClassName="text-primary-white"
        bodyClassName="overflow-y-auto p-8"
        headerColor="green"
        footerColor="green"
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
        <div className="modal flex flex-col h-full max-h-[50vh] ">
          <h1 className="font-semibold text-lg">Visi</h1>
          {activeItem && <p className="text-justify text-md">{activeItem.visi}</p>}
          <div className="py-5">
            <div className="flex justify-between text-lg font-extrabold flex-row py-4">
              <p>Nama Prodi</p>
              <p>Akreditasi</p>
            </div>
            {activeItem && (
              <div className="flex flex-col gap-4 justify-between items-center max-h-[50vh] xl:w-full ">
                {activeItem.prodi?.map((item, idx) => (
                  <Accordion
                    showIcon={false}
                    key={idx}
                    title={item.prod}
                    titleClassName="text-slate-7 hover:text-primary-green font-normal"
                    newIcon={item.akreditasi}
                  >
                    <div className="bg-slate-4 w-full h-[2px] mt-3"></div>
                    <div className="px-5">
                      <h1 className="font-bold text-lg text-primary-green pb-5 py-4">
                        Deskripsi Prodi
                      </h1>
                      <p className="text-sm text-justify">{item.about}</p>
                      <h1 className="font-bold text-xl py-5 text-primary-green">Spesialisasi</h1>
                      <div className="pb-2 w-[90%] px-5">
                        <ul className="list-disc md:grid md:grid-cols-2 flex flex-col pb-4  items-start justify-center ">
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
      <section key="program-studi" className="w-full min-h-screen">
        <HeroBanner
          heroImages="/illustrations/prodi-banner.webp"
          heroTitleBottomRight="Fakultas dan Program Studi"
          backgroundColor="bg-grayscale-8"
          blur
        />
        <div className="lg:w-full w-auto lg:p-16 py-8 px-8 text-center flex justify-center font-bebasNeue">
          <div className="flex flex-col lg:gap-y-16  w-full gap-y-8">
            <div className="lg:w-4/5 w-full lg:mx-auto ">
              <h1 className="text-center text-secondary-green-5 lg:text-3xl text-xl font-bold">
                Uninus memiliki beberapa pilihan program studi yang terbagi dalam 8 fakultas
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full flex p-2  justify-center">
          <SearchInput
            placeholder="Cari Nama Fakultas dan Program Studi"
            value={searchQuery}
            onChange={handleSearch}
            width="w-70% lg:w-80%"
          />
        </div>

        <section className="w-full h-full py-8 px-7 flex justify-center">
          <div className="flex flex-wrap xl:grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 justify-center py-4 items-center">
            {filteredDataAkun.map((item, idx) => (
              <div
                key={idx}
                className="w-[265px]  h-[220px] rounded overflow-hidden shadow-md relative cursor-pointer  col-span-1  hover:scale-90"
                onClick={() => {
                  setActiveItem(item);
                  handleOpenModal(item.name);
                }}
              >
                <div className=" hidden lg:block lg:mb-[4rem] ">
                  <Image src={item.img} width={595} height={360} alt={item.name} quality={100} />
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

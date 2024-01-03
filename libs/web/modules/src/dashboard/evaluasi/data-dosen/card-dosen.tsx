"use client";
import { ReactElement, FC, useState, SetStateAction, Fragment } from "react";
import Image from "next/image";
import { SearchInput, Modal, TableLoadingData, Button } from "@uninus/web/components";
import { dataDosen } from "./store";
import DataTable, { TableColumn } from "react-data-table-component";
import { TColumnDosen } from "./types";
import Link from "next/link";
import { AiFillFileText } from "react-icons/ai";

export const CardDosen: FC = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [conditionModal] = useState<string | null | undefined>(null);

  const onCloseModal = () => {
    setShowModal(false);
  };
  const dataTableModal = dataDosen?.find((item) => item.name === conditionModal);

  const dataDosenModal: TColumnDosen[] = [
    {
      name: <span className="text-base font-medium pl-2">Nama</span>,
      item: <span className="text-base font-medium">: {dataTableModal?.name}</span>,
    },
    {
      name: <span className="text-base font-medium pl-2">NIP</span>,
      item: <span className="text-base font-medium">: {dataTableModal?.nip}</span>,
    },
    {
      name: <span className="text-base font-medium pl-2">NIDN</span>,
      item: <span className="text-base font-medium">: {dataTableModal?.nidn}</span>,
    },
    {
      name: <span className="text-base font-medium pl-2">Status Dosen</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.dosen_status?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.dosen_status?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Jabatan Fungsional</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          {dataTableModal?.jafung && (
            <Link href={`${dataTableModal?.jafung?.[0].link}`} target="_blank">
              <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
            </Link>
          )}
          <h3 className="ml-4">{dataTableModal?.jafung?.[0].nama || "-"}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">SK Pengangkatan</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.sk_pengangkatan}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">SK Mengajar</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          {(dataTableModal?.sk_mengajar && (
            <Link href={`${dataTableModal?.sk_mengajar}`} target="_blank">
              <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
            </Link>
          )) ||
            " -"}
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Lingkup Kerja</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.lingkup_kerja?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.lingkup_kerja?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Unit Kerja</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.unit_kerja?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.unit_kerja?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Fakultas</span>,
      item: (
        <div className="w-full flex items-center text-sm gap-2 font-medium">
          :
          <div className="flex flex-col">
            {dataTableModal?.fakultas?.map((fakultas) => <h3>{fakultas.nama}</h3>)}
          </div>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Prodi</span>,
      item: (
        <div className="w-full flex items-center text-sm gap-2 font-medium">
          :
          <div className="flex flex-col">
            {dataTableModal?.prodi?.map((prodi) => <h3>{prodi.nama}</h3>)}
          </div>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Tugas Tambahan</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.tugas_tambahan?.[0].link}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
          <h3 className="ml-4">{dataTableModal?.tugas_tambahan?.[0].nama}</h3>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Sertifikat Pendidik</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.sertifikat_pendidik}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
        </div>
      ),
    },
    {
      name: <span className="text-base font-medium pl-2">Sertifikat Profesi</span>,
      item: (
        <div className="w-full flex items-center text-base font-medium">
          :
          <Link href={`${dataTableModal?.sertifikat_profesi}`} target="_blank">
            <AiFillFileText className="text-2xl text-primary-green cursor-pointer" />
          </Link>
        </div>
      ),
    },
  ];

  const customStylesTableModal = {
    rows: {
      style: {
        width: "100%",
        minHeight: "35px",
        background: "#F5F5F5",
      },
      stripedStyle: {
        background: "#FFFFFF",
      },
    },
    cells: {
      style: {
        padding: "10px",
      },
    },
  };

  const columnsModal: TableColumn<TColumnDosen>[] = [
    {
      cell: (row) => row.name,
      width: "200px",
    },
    {
      cell: (row) => row.item,
      width: "250px",
    },
  ];

  const filteredDataDosen = dataDosen.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detail.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      <Modal
        modalTitle="Detail Data Dosen"
        titleColor="white"
        headerColor="green"
        closeClassName="text-primary-white"
        showModal={showModal}
        onClose={onCloseModal}
        bodyClassName="flex w-full h-auto flex-col px-10 justify-center items-center"
        className="max-w-xl max-h-full rounded-lg bg-primary-white"
      >
        <figure className="flex justify-center items-center mt-4">
          <Image
            src={"/illustrations/dummy-avatar.webp"}
            alt="foto"
            width={500}
            height={500}
            quality={100}
            className="w-[40%] h-[40%] rounded-full"
          />
        </figure>
        <section className="rounded-lg w-full my-5">
          <DataTable
            columns={columnsModal}
            data={dataDosenModal}
            customStyles={customStylesTableModal}
            noTableHead
            striped
            fixedHeader
            fixedHeaderScrollHeight="400px"
            progressComponent={<TableLoadingData className="w-full h-80" />}
            noDataComponent={
              <div className="flex flex-col w-full h-80 justify-center items-center">
                <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
                <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
              </div>
            }
          />
        </section>
      </Modal>
      <div className="flex py-2 justify-end">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari Nama Dosen dan Kategori Perkuliahan"
          width="w-[450px]"
        />
      </div>
      <div className="w-full grid grid-cols-4 gap-4">
        {filteredDataDosen.map((item, index) => (
          <div
            className="w-auto h-[300px] shadow-lg rounded-md  justify-center items-center "
            key={index}
          >
            <section className="p-2">
              <div className="rounded-md w-full h-[160px] bg-[#E6F5ED]">
                <figure className="flex w-full h-full justify-center items-center">
                  <Image
                    src={"/illustrations/dummy-avatar.webp"}
                    alt="foto"
                    width={120}
                    height={180}
                    quality={100}
                    className="rounded-md"
                  />
                </figure>
              </div>
              <div className="flex flex-col gap-2 w-full justify-center items-center py-4 cursor-default ">
                <p className="font-bold text-center">{item.name}</p>
                <p className="text-xs text-disabled">{item.detail}</p>
                <Button
                  variant="filled"
                  height="h-6"
                  width="w-full"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <span className="pl-2 text-[10px]">Lihat Detail</span>
                </Button>
              </div>
            </section>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

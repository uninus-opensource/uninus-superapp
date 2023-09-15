"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataPegawai } from "./types";
import { dataPegawai } from "./store";
import { TableLoadingData, SearchInput, Button } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCopy,
  AiFillFastBackward,
  AiFillFastForward,
  AiFillFileText,
  AiOutlineEdit,
  AiOutlineFilter,
  AiOutlinePlus,
} from "react-icons/ai";
import Link from "next/link";

const Table: FC = (): ReactElement => {
  const [tablePegawai, setTablePegawai] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);
  const columns: TableColumn<TDataPegawai>[] = [
    {
      name: <div className="pl-4">No</div>,
      cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
      width: "70px",
    },
    {
      name: "Nama Dosen",
      cell: (row) => row.name,
      width: "150px",
    },
    {
      name: "NIP",
      cell: (row) => row.nip,
      width: "140px",
    },
    {
      name: "NIDN",
      cell: (row) => row.nidn,
      width: "140px",
    },
    {
      name: "Status Dosen",
      cell: (row) => row.dosen_status,
      width: "160px",
    },
    {
      name: "SK Pengangkatan",
      cell: (row) =>
        row.sk_pengangkatan ? (
          <Link href={`${row?.sk_pengangkatan}`} target="_blank">
            <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
          </Link>
        ) : (
          <div className="text-lg font-semibold"> - </div>
        ),
      width: "160px",
    },
    {
      name: "SK Mengajar",
      cell: (row) =>
        row.sk_mengajar ? (
          <Link href={`${row?.sk_mengajar}`} target="_blank">
            <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
          </Link>
        ) : (
          <div className="text-lg font-semibold"> - </div>
        ),
      width: "140px",
    },
    {
      name: "Lingkup Kerja",
      cell: (row) => (
        <section className="w-[65%] flex gap-2 items-center justify-between">
          {row?.lingkup_kerja[0].nama}
          <Link href={`${row?.lingkup_kerja[0].link}`} target="_blank">
            <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
          </Link>
        </section>
      ),
      width: "160px",
    },
    {
      name: "Unit Kerja",
      cell: (row) => (
        <section className="w-[70%] flex gap-2 items-center justify-between">
          {row?.unit_kerja[0].nama}
          <Link href={`${row?.unit_kerja[0].link}`} target="_blank">
            <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
          </Link>
        </section>
      ),
      width: "190px",
    },
    {
      name: "Jafung",
      cell: (row) =>
        row.jafung ? (
          <section className="w-[65%] flex gap-2 items-center justify-between">
            {row?.lingkup_kerja[0].nama}
            <Link href={`${row?.lingkup_kerja[0].link}`} target="_blank">
              <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
            </Link>
          </section>
        ) : (
          <div className="text-lg font-semibold"> - </div>
        ),

      width: "160px",
    },
    {
      name: "Fakultas",
      cell: (row) => (
        <div className="flex flex-col gap-1">
          {row.fakultas.map((fakultas) => (
            <span>{fakultas.nama}</span>
          ))}
        </div>
      ),
      width: "180px",
    },
    {
      name: "Prodi",
      cell: (row) => (
        <div className="flex flex-col gap-1">
          {row.prodi.map((prodi) => (
            <span>{prodi.nama}</span>
          ))}
        </div>
      ),
      width: "220px",
    },
    {
      name: "Tugas Tambahan",
      cell: (row) =>
        row.tugas_tambahan ? (
          <section className="w-[60%] flex gap-2 items-center justify-between">
            {row?.tugas_tambahan[0].nama}
            <Link href={`${row?.tugas_tambahan[0].link}`} target="_blank">
              <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
            </Link>
          </section>
        ) : (
          <div className="text-lg font-semibold"> - </div>
        ),
      width: "170px",
    },
    {
      name: "Sertifikat Pendidik",
      cell: (row) =>
        row.sertifikat_pendidik ? (
          <Link href={`${row?.sertifikat_pendidik}`} target="_blank">
            <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
          </Link>
        ) : (
          <div className="text-lg font-semibold"> - </div>
        ),
      width: "160px",
    },
    {
      name: "Sertifikat Profesi",
      cell: (row) =>
        row.sertifikat_profesi ? (
          <Link href={`${row?.sertifikat_profesi}`} target="_blank">
            <AiFillFileText className="text-xl text-primary-green cursor-pointer" />
          </Link>
        ) : (
          <div className="text-lg font-semibold"> - </div>
        ),
      width: "150px",
    },
    {
      name: <div className="pl-4">Status</div>,
      cell: (row) => (
        <div
          className={`text-primary-black ${
            row.status === "Aktif"
              ? "bg-secondary-green-7"
              : row.status === "Cuti"
              ? "bg-primary-yellow"
              : "bg-red-3"
          } w-[100px] py-1 text-sm text-center rounded-md cursor-default`}
        >
          {row.status}
        </div>
      ),
      width: "180px",
    },
    {
      name: "Tindakan",
      cell: (row) => (
        <Button variant="filled" height="h-6" width="w-20">
          <AiOutlineEdit className="text-lg text-primary-white cursor-pointer" />
          <span className="pl-2 text-[10px]">Edit</span>
        </Button>
      ),
      width: "150px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        width: "100%",
        minHeight: "70px",
        background: "#F5F5F5",
      },
      stripedStyle: {
        background: "#FFFFFF",
      },
    },
    headCells: {
      style: {
        paddingLeft: "5px",
        paddingRight: "5px",
        backgroundColor: "#AFFFD4",
        color: "#000000",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "5px",
      },
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTablePegawai(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tablePegawai]);

  const filteredDataPegawai = dataPegawai.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="rounded-lg w-full">
      <div className="w-full flex p-2 py-4 gap-4 lg:justify-end justify-start items-center">
        <Button variant="outlined" height="h-9" width="w-24">
          <AiOutlineFilter className="text-lg text-primary-black" />
          <span className="text-sm font-medium pl-2 text-primary-black">Filter</span>
        </Button>
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari Nama, NIP/NIDN, dan Status"
          width="w-[100%]"
        />
        <Button variant="filled" height="h-9">
          <AiOutlinePlus className="text-lg" />
          <span className="text-sm font-medium pl-2">Tambah Pegawai</span>
        </Button>
        <Button variant="filled" height="h-9">
          <AiFillCopy className="text-lg" />
          <span className="text-sm font-medium pl-2">Export</span>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={filteredDataPegawai}
        customStyles={customStyles}
        fixedHeader={true}
        progressPending={pending}
        striped
        progressComponent={<TableLoadingData className="w-full h-80" />}
        noDataComponent={
          <div className="flex flex-col w-full h-80 justify-center items-center">
            <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
            <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
          </div>
        }
        pagination
        paginationComponentOptions={{
          rangeSeparatorText: "ditampilkan dari",
          rowsPerPageText: "Tampilkan",
        }}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationIconPrevious={<AiFillCaretLeft className="text-xl" />}
        paginationIconNext={<AiFillCaretRight className="text-xl" />}
        paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
        paginationIconLastPage={<AiFillFastForward className="text-xl" />}
      />
    </section>
  );
};
export default Table;

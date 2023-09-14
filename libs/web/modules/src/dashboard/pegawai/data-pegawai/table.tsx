"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataPegawai } from "./types";
import { dataPegawai } from "./store";
import { TableLoadingData, SearchInput } from "@uninus/web/components";
import { FileTextOutlined, FormOutlined } from "@ant-design/icons";

const Table: FC = (): ReactElement => {
  const [tablePegawai, setTablePegawai] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);
  const columns: TableColumn<TDataPegawai>[] = [
    {
      name: "No",
      cell: (row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
      width: "70px",
    },
    {
      name: "Nama Dosen",
      cell: (row) => row.name,
      width: "150px",
    },
    {
      name: "NIP/NIDN",
      cell: (row) => row.nip,
      width: "140px",
    },
    {
      name: "Fakultas",
      cell: (row) => row.faculty,
      width: "160px",
    },
    {
      name: "Prodi",
      cell: (row) => row.major,
      width: "160px",
    },
    {
      name: "Jafung",
      cell: (row) => row.jafung,
      width: "120px",
    },
    {
      name: "Unit Kerja",
      cell: (row) => row.job_unit,
      width: "140px",
    },
    {
      name: "SK",
      cell: (row) => row.sk,
      width: "120px",
    },
    {
      name: "Sertifikat Dosen",
      cell: (row) => row.lecturer_certificate,
      width: "150px",
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={` ${
            row.status === "Aktif" ? "bg-[#AFFFD4] text-primary-green" : "bg-red-3 text-red-5"
          } text-white w-[100px] py-1 text-sm text-center rounded-md cursor-default`}
        >
          {row.status}
        </button>
      ),
      width: "150px",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        width: "100%",
        minHeight: "45px",
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
        paddingLeft: "5px",
        paddingRight: "5px",
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
      item.jafung.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="rounded-lg w-full">
      <div className="w-full flex p-2 py-4 lg:justify-end justify-start">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari Nama, NIP/NIDN, Jafung dan Status"
        />
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
          <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
            <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
          </div>
        }
        pagination
        paginationComponentOptions={{
          rangeSeparatorText: " dari ",
        }}
      />
    </section>
  );
};
export default Table;

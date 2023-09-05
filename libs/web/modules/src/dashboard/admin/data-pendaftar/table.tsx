"use client";
import { FC, ReactElement } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataPendaftar } from "./types";
import { dataAkun } from "./store";
import { LoadingSpinner } from "@uninus/web/components";
import { FileTextOutlined, FormOutlined } from "@ant-design/icons";

const Table: FC = (): ReactElement => {
  const columns: TableColumn<TDataPendaftar>[] = [
    {
      name: "No",
      cell: (row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
      width: "50px",
    },
    {
      name: "No Registrasi",
      cell: (row) => row.registration_number,
      width: "200px",
    },
    {
      name: "Nama Lengkap",
      cell: (row) => row.name,
      width: "200px",
    },
    {
      name: "Prodi Pilihan 1",
      cell: (row) => row.prodi_1,
      width: "200px",
    },
    {
      name: "Prodi Pilihan 2",
      cell: (row) => row.prodi_2,
      width: "200px",
    },
    {
      name: "Jalur Seleksi",
      cell: (row) => row.seleksi,
      width: "160px",
    },
    {
      name: "Rata - rata Rapot",
      cell: (row) => <div className="pl-4">{row.rapot}</div>,
      width: "120px",
    },
    {
      name: "Skor SNBT",
      cell: (row) => <div className="pl-4">{row.utbk}</div>,
      width: "120px",
    },
    {
      name: "Status Registrasi",
      cell: (row) => (
        <button
          className={` ${
            row.status === "Lolos Seleksi"
              ? "bg-[#AFFFD4] text-primary-green"
              : "bg-red-3 text-red-5"
          } text-white w-[150px] py-1 text-sm text-center rounded-md cursor-default`}
        >
          {row.status}
        </button>
      ),
      width: "200px",
    },
    {
      name: "Action",
      width: "200px",
      cell: (row) => (
        <div className="flex gap-2 w-full">
          <button className="flex w-full gap-2 bg-primary-green text-primary-white rounded-md p-1 px-3 items-center">
            <div>
              <FormOutlined />
            </div>
            Edit
          </button>
          <button className="flex w-full gap-2 bg-primary-yellow  rounded-md p-1 px-1 items-center">
            <div>
              <FileTextOutlined />
            </div>
            Validasi
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px",

        "&:nth-child(odd)": {
          backgroundColor: "#FFFFFF",
        },
        "&:nth-child(even)": {
          backgroundColor: "#F5F5F5",
        },
      },
      stripedStyle: {
        background: "#F5F5F5",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#AFFFD4",
        color: "#000000",
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={dataAkun}
        customStyles={customStyles}
        fixedHeader={true}
        progressComponent={<LoadingSpinner className="w-10 h-10" />}
        noDataComponent={
          <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
            <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
          </div>
        }
      />
    </div>
  );
};
export default Table;

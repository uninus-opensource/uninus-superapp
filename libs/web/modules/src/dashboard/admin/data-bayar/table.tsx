"use client";
import { FC, ReactElement, useState, useEffect, SetStateAction } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataBayar } from "./types";
import { dataBayar } from "./store";
import { TableLoadingData, SearchInput } from "@uninus/web/components";
import { FileTextOutlined } from "@ant-design/icons";
import { match } from "ts-pattern";

const Table: FC = (): ReactElement => {
  const [tableAkun, setTableAkun] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);
  const columnsAkun: TableColumn<TDataBayar>[] = [
    {
      name: "No",
      cell: (row, rowIndex) => <div className="px-1">{rowIndex + 1}</div>,
      width: "5%",
    },
    {
      name: "Tanggal Pengajuan",
      cell: (row) => row.date_pengajuan as string,
      width: "15%",
    },
    {
      name: "Nama Pengajuan",
      cell: (row) => row.nama_pengajuan,
      width: "25%",
    },
    {
      name: "Nama Petugas",
      cell: (row) => row.nama_petugas,
      width: "25%",
    },
    {
      name: "Status",
      cell: (row) => (
        <button
          className={`${match(row.status)
            .with("Sudah Disetujui", () => "bg-[#AFFFD4] text-primary-green")
            .with("Belum Disetujui", () => "bg-[#FFF6DC] text-[#FFC107]")
            .otherwise(
              () => "bg-red-3 text-red-5",
            )} text-white w-[150px] py-1 text-sm text-center rounded-md cursor-default`}
        >
          {row.status}
        </button>
      ),
      width: "200px",
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex gap-2 w-full">
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTableAkun(columnsAkun);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tableAkun]);

  const filteredDataAkun = dataBayar.filter(
    (item) =>
      item.nama_pengajuan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nama_petugas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <div className="w-full flex p-2 py-4 lg:justify-end justify-start">
        <SearchInput
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari Nama,Email dan Nomor telepon"
        />
      </div>
      <DataTable
        columns={columnsAkun}
        data={filteredDataAkun}
        customStyles={customStyles}
        fixedHeader={true}
        progressPending={pending}
        progressComponent={<TableLoadingData className="w-full h-80" />}
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

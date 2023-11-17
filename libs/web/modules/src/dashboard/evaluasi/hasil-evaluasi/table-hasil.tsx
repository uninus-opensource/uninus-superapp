"use client";
import { FC, ReactElement, useEffect, useState, SetStateAction, Fragment } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataHasil } from "./types";
import { dataPegawai } from "./store";
import { TableLoadingData, SearchInput, Button } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCopy,
  AiFillFastBackward,
  AiFillFastForward,
  AiFillEye,
} from "react-icons/ai";

const TableHasil: FC = (): ReactElement => {
  const [tableHasil, setTableHasil] = useState([{}]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pending, setPending] = useState(true);

  const columns: TableColumn<TDataHasil>[] = [
    {
      name: <div className="pl-4">No</div>,
      cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
      width: "8%",
    },
    {
      name: "Nama Dosen",
      cell: (row) => <div className="text-left">{row.nama}</div>,
      width: "15%",
    },
    {
      name: "Fakultas",
      cell: (row) => <div className="text-left">{row.fakultas}</div>,
      width: "16%",
    },
    {
      name: "Prodi",
      cell: (row) => <div className="text-left">{row.prodi}</div>,
      width: "16%",
    },
    {
      name: "Grade",
      cell: (row) => <div className="text-left">{row.grade}</div>,
      width: "15%",
    },
    {
      name: "Penilaian",
      cell: (row) => <div className="text-left">{row.penilaian}</div>,
      width: "15%",
    },
    {
      name: "Tindakan",
      cell: (row) => (
        <div className="flex gap-2 w-full">
          <Button variant="green-outline" height="h-6" width="w-32">
            <AiFillEye className="text-lg text-primary-green cursor-pointer" />
            <span className="pl-2 text-[10px]">Lihat Detail</span>
          </Button>
        </div>
      ),
      width: "15%",
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
      setTableHasil(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [tableHasil]);

  const filteredDataHasil = dataPegawai.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fakultas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prodi.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Fragment>
      {/* Table */}
      <section className="rounded-lg w-full px-5 lg:px-0">
        <div className="w-full flex flex-wrap p-2 py-4 gap-4  justify-start items-center">
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari Nama Dosen, Fakultas dan Prodi"
          />
          <Button variant="filled" height="h-9" styling="bg-warning-500 hover:bg-warning-300">
            <AiFillCopy className="text-lg" />
            <span className="text-sm font-medium pl-2">Cetak</span>
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={filteredDataHasil}
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
          paginationIconNext={<AiFillCaretRight className="text-xl ml-0.5" />}
          paginationIconFirstPage={<AiFillFastBackward className="text-xl" />}
          paginationIconLastPage={<AiFillFastForward className="text-xl ml-0.5" />}
        />
      </section>
    </Fragment>
  );
};
export default TableHasil;

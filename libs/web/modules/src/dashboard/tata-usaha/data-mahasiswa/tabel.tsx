"use client";
import { Button, TableLoadingData } from "@uninus/web/components";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillContacts,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineAudit,
} from "react-icons/ai";
import { TDataMahasiswaTataUsaha } from "./type";
import { dataMahasiswaTataUsaha } from "./store";
import { getProgramStyle, getStatusStyle } from "./style";

export const TableDataMahasiswaTataUsaha: FC = (): ReactElement => {
  const [mahasiswaColumn, setMahasiswaColumn] = useState([{}]);
  const [pending, setPending] = useState(true);

  const columns: TableColumn<TDataMahasiswaTataUsaha>[] = useMemo(() => {
    return [
      {
        name: <div className="pl-3">No</div>,
        cell: (row, rowIndex) => (
          <div className="pl-5" key={rowIndex}>
            {rowIndex + 1}
          </div>
        ),
        width: "70px",
      },
      {
        name: "NIM",
        cell: (row) => row.nim,
        width: "150px",
      },
      {
        name: "Nama",
        cell: (row) => row.nama,
        width: "175px",
      },
      {
        name: "Angkatan",
        cell: (row) => row.angkatan,
        width: "100px",
      },
      {
        name: "Program",
        cell: (row: { program: string }) => (
          <div
            className={`w-full py-3 rounded-md font-bold flex justify-center items-center ${getProgramStyle(
              row.program,
            )}`}
          >
            {row.program}
          </div>
        ),
        width: "150px",
      },
      {
        name: "Kelas / Semester",
        cell: (row) => <div className="w-full h-auto">{row.kelasSemester}</div>,
        width: "100px",
      },
      {
        name: "Dosen PA",
        cell: (row) => row.dosenPa,
        width: "100px",
      },

      {
        name: "Status",
        cell: (row) => (
          <div
            className={`w-full py-3 rounded-md font-bold flex justify-center items-center ${getStatusStyle(
              row.status,
            )}`}
          >
            {row.status}
          </div>
        ),
        width: "150px",
      },
      {
        name: "Aksi",
        cell: (row) => (
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <Button variant="custom" styling="bg-primary-green text-primary-white w-full">
                <AiFillContacts className="text-[2rem]" />
              </Button>
            </div>
            <div className="w-1/2">
              <Button variant="custom" styling="bg-primary-green text-primary-white w-full">
                <AiOutlineAudit className="text-[2rem]" />
              </Button>
            </div>
          </div>
        ),
        width: "120px",
      },
    ];
  }, [getProgramStyle]);

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
      setMahasiswaColumn(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [mahasiswaColumn, columns]);

  return (
    <DataTable
      columns={mahasiswaColumn}
      data={dataMahasiswaTataUsaha}
      customStyles={customStyles}
      progressPending={pending}
      progressComponent={<TableLoadingData className="w-full h-80" />}
      responsive
      fixedHeader
      fixedHeaderScrollHeight="300px"
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
  );
};

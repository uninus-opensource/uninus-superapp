"use client";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataMataKuliah } from "./type";
import { dataMataKuliah } from "./store";
import { TableLoadingData } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
} from "react-icons/ai";

export const Table: FC = (): ReactElement => {
  const [krsColumn, setKrsColumn] = useState([{}]);
  const [pending, setPending] = useState(true);

  const columns: TableColumn<TDataMataKuliah>[] = useMemo(
    () => [
      {
        name: <div className="pl-3">No</div>,
        cell: (row, rowIndex) => (
          <div className="pl-5" key={rowIndex}>
            {rowIndex + 1}
          </div>
        ),
        width: "120px",
      },
      {
        name: "Kode MK",
        cell: (row) => row.kode_mk,
        width: "175px",
      },
      {
        name: "SKS",
        cell: (row) => row.sks,
        width: "175px",
      },
      {
        name: "Kelas",
        cell: (row) => row.kelas,
        width: "175px",
      },
      {
        name: "Jadwal",
        cell: (row) => row.jadwal,
        width: "175px",
      },
      {
        name: "Ruangan",
        cell: (row) => row.ruangan,
        width: "175px",
      },
      {
        name: "Dosen",
        cell: (row) => row.dosen,
        width: "175px",
      },
      {
        name: "Status",
        cell: (row) => (
          <div
            className={`font-bold ${
              row.status === "Disetujui"
                ? "bg-green-50 text-primary-green"
                : row.status === "Belum Disetujui"
                ? "bg-warning-100 text-conditional-warning"
                : ""
            } w-[145px] py-1 text-sm text-center rounded-md cursor-default`}
          >
            {row.status}
          </div>
        ),
        width: "175px",
      },
    ],
    [],
  );

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
      setKrsColumn(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [krsColumn, columns]);

  return (
    <DataTable
      columns={krsColumn}
      data={dataMataKuliah}
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

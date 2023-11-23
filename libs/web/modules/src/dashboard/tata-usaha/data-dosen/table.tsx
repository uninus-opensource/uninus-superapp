"use client";
import { Button, TableLoadingData } from "@uninus/web/components";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineContacts,
} from "react-icons/ai";
import { TDataDosenTataUsaha } from "./type";
import { dataDosenTataUsaha } from "./store";
import { getStatusStyle } from "./style";

export const TableDataDosenTataUsaha: FC = (): ReactElement => {
  const [dosenColumn, setDosenColumn] = useState([{}]);
  const [pending, setPending] = useState(true);

  const columns: TableColumn<TDataDosenTataUsaha>[] = useMemo(() => {
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
        name: "Nama",
        cell: (row) => row.nama,
        width: "150px",
      },
      {
        name: "NIP",
        cell: (row) => row.nip,
        width: "150px",
      },
      {
        name: "NIDN",
        cell: (row) => row.nidn,
        width: "150px",
      },
      {
        name: "Jenis Dosen",
        cell: (row) => <div className="w-full h-auto">{row.jenisDosen}</div>,
        width: "150px",
      },
      {
        name: "Prodi",
        cell: (row) => row.prodi,
        width: "150px",
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
          <div className="w-full flex">
            <div className="w-full m-5">
              <Button variant="custom" styling="bg-primary-green text-primary-white w-full">
                <div className="w-full flex justify-center items-center gap-3">
                  <AiOutlineContacts className="text-[1.1rem]" />
                  <h3 className="text-primary-white text-[0.8rem]">Detail</h3>
                </div>
              </Button>
            </div>
          </div>
        ),
        width: "150px",
      },
    ];
  }, []);

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
      setDosenColumn(columns);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [dosenColumn, columns]);

  return (
    <DataTable
      columns={dosenColumn}
      data={dataDosenTataUsaha}
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

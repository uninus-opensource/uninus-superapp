"use client";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, SelectOption, TableLoadingData } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
  AiOutlineEdit,
} from "react-icons/ai";
import { TDataKuesioner } from "./type";
import { dataTabelKuesioner} from "./store";
import { FieldValues, useForm } from "react-hook-form";

export const TableKuesionerSiakad: FC = (): ReactElement => {
  const [krsColumn, setKrsColumn] = useState([{}]);
  const [pending, setPending] = useState(true);
  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });
  const columns: TableColumn<TDataKuesioner>[] = useMemo(
    () => [
    
      {
        name: "Nama Mata Kuliah",
        cell: (row) => (<div className="px-2">{row.nama_matkul}</div>),
        width: "35%",
      },
      {
        name: "Nama Dosen",
        cell: (row) => row.nama_dosen,
        width: "25%",
      },
      {
        name: "Status",
        cell: (row) => (
          <div
            className={`font-bold text-center justify-center ${
              row.status === "Sudah Mengisi"
                ? "bg-green-50 text-primary-green"
                : row.status === "Belum Mengisi"
                ? "bg-red-9 text-conditional-error"
                : ""
            } w-[145px] py-1 text-sm text-center rounded-md cursor-default`}
          >
            {row.status}
          </div>
        ),
        width: "25%",
      },
      {
        name: "Action",
        cell: (row) => (
          <Button variant="filled" height="h-6" width="w-30">
          <AiOutlineEdit className="text-lg text-primary-white cursor-pointer" />
          <span className="pl-2 text-[10px]">Lakukan Pengisian</span>
        </Button>

        ),
        width: "15%",
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
    <section className="w-full h-full md:h-screen flex flex-col gap-y-4">
     
      <DataTable
        columns={krsColumn}
        data={dataTabelKuesioner}
        customStyles={customStyles}
        progressPending={pending}
        progressComponent={<TableLoadingData className="w-full h-80" />}
        responsive
        pagination
        fixedHeader={true}
        fixedHeaderScrollHeight="400px"
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
  );
};

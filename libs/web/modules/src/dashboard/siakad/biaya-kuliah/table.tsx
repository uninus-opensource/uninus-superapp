"use client";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { SelectOption, TableLoadingData } from "@uninus/web/components";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastBackward,
  AiFillFastForward,
} from "react-icons/ai";
import { TDataBiayaKuliah } from "./type";
import { dataBiayaKuliah } from "./store";
import { FieldValues, useForm } from "react-hook-form";

export const TableBiayaKuliah: FC = (): ReactElement => {
  const [krsColumn, setKrsColumn] = useState([{}]);
  const [pending, setPending] = useState(true);
  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });
  const columns: TableColumn<TDataBiayaKuliah>[] = useMemo(
    () => [
      {
        name: <div className="pl-3">No</div>,
        cell: (row, rowIndex) => (
          <div className="pl-5" key={rowIndex}>
            {rowIndex + 1}
          </div>
        ),
        width: "10%",
      },
      {
        name: "Kode Pembayaran",
        cell: (row) => row.kode_bayar,
        width: "13%",
      },
      {
        name: "Pembayaran",
        cell: (row) => row.bayar,
        width: "12%",
      },
      {
        name: "Biaya",
        cell: (row) => row.biaya,
        width: "15%",
      },
      {
        name: "Potongan",
        cell: (row) => row.potongan,
        width: "15%",
      },
      {
        name: "Total Bayar",
        cell: (row) => row.total_bayar,
        width: "15%",
      },
      {
        name: "Status Pembayaran",
        cell: (row) => (
          <div
            className={`font-bold ${
              row.status === "Lunas"
                ? "bg-green-50 text-primary-green"
                : row.status === "Belum Membayar"
                ? "bg-red-9 text-conditional-error"
                : ""
            } w-[145px] py-1 text-sm text-center rounded-md cursor-default`}
          >
            {row.status}
          </div>
        ),
        width: "20%",
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
      <div className="w-full flex flex-col  z-10">
        <div className="w-full  flex flex-row justify-between items-center">
          <h1>2020/2021 Ganjil</h1>

          <SelectOption
            name="year"
            options={[
              {
                value: "1",
                label: "2023/2024",
              },
              {
                value: "2",
                label: "2022/2023",
              },
              {
                value: "3",
                label: "2021/2022",
              },
            ]}
            placeholder="2023/2024"
            required={false}
            size="md"
            control={control}
            className="w-full"
            isClearable={true}
            selectColor="white"
            optionColor="white"
            isBordered={true}
          />
        </div>
      </div>
      <DataTable
        columns={krsColumn}
        data={dataBiayaKuliah}
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

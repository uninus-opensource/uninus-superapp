"use client";
import DataTable, { TableColumn } from "react-data-table-component";
import { FC, ReactElement, useState, useEffect, useMemo } from "react";
import { TPaymentSummary } from "./type";
import { paymentSummaryData } from "./store";

export const PaymentSummaryTable: FC = (): ReactElement => {
  const [dataPaymentSummary, setDataPaymentSummary] = useState([{}]);

  const columnsPaymentSummary: TableColumn<TPaymentSummary>[] = useMemo(
    () => [
      {
        name: <div className="pl-4">No</div>,
        cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
        width: "80px",
      },
      {
        name: "Fakultas",
        cell: (row) => row.fakultas,
        width: "auto",
      },
      {
        name: "Total Mahasiswa",
        cell: (row) => row.totalMahasiswa,
        width: "auto",
      },
      {
        name: "Telah Terbayar",
        cell: (row) => row.alreadyPayed,
        width: "auto",
      },
      {
        name: "Sisa Belum bayar",
        cell: (row) => row.remainingPayment,
        width: "auto",
      },
    ],
    [],
  );

  useEffect(() => {
    setDataPaymentSummary(columnsPaymentSummary);
  }, [columnsPaymentSummary, dataPaymentSummary]);
  return (
    <DataTable
      columns={columnsPaymentSummary}
      data={paymentSummaryData as TPaymentSummary[]}
      noDataComponent={
        <div className="flex flex-col w-full h-screen justify-center items-center">
          <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
          <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
        </div>
      }
      paginationServer
    />
  );
};

"use client";
import DataTable, { TableColumn } from "react-data-table-component";
import { FC, ReactElement, useState, useEffect, useMemo } from "react";
import { TFacultyPaymentDeposit } from "./type";
import { useGetPaymentDeposit } from "./hook";
export const PaymentSummaryTable: FC = (): ReactElement => {
  const [dataPaymentSummary, setDataPaymentSummary] = useState([{}]);

  const { data } = useGetPaymentDeposit();
  const columnsPaymentSummary: TableColumn<TFacultyPaymentDeposit>[] = useMemo(
    () => [
      {
        name: <div className="pl-4">No</div>,
        cell: (row, rowIndex) => <div className="pl-5">{rowIndex + 1}</div>,
        width: "80px",
      },
      {
        name: "Fakultas",
        cell: (row) => row.faculty,
        width: "auto",
      },
      {
        name: "Total Mahasiswa",
        cell: (row) => row.total_student,
        width: "auto",
      },
      {
        name: "Total Kewajiban",
        cell: (row) => row.total_payment_obligation,
        width: "auto",
      },
      {
        name: "Telah Terbayar",
        cell: (row) => row.paid,
        width: "auto",
      },
      {
        name: "Sisa Belum bayar",
        cell: (row) => row.unpaid,
        width: "auto",
      },
    ],
    [],
  );

  useEffect(() => {
    setDataPaymentSummary(columnsPaymentSummary);
  }, [columnsPaymentSummary, data, dataPaymentSummary]);
  return (
    <DataTable
      columns={columnsPaymentSummary}
      data={data?.data as unknown as TFacultyPaymentDeposit[]}
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

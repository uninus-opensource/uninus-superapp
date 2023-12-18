import { FC, ReactElement, useMemo } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { TDataProdi } from "./type";
import { data } from "./store";
export const DataProdiTable: FC = (): ReactElement => {
  // const subColumns = [
  //   { header: "Lunas", width: "auto" },
  //   { header: "Cicil", width: "auto" },
  //   { header: "Belum", width: "auto" },
  // ];
  const columsDataProdi: TableColumn<TDataProdi>[] = useMemo(
    () => [
      {
        name: "Jumlaah Mahasiwa",
        width: "auto",
        subHeaderComponent: (
          <tr>
            <th colSpan={3}>Grup A</th>
            <th colSpan={3}>Grup B</th>
          </tr>
        ),
      },
      { name: "Angkatan", width: "auto" },
      { name: "Total Kewajiban", width: "auto" },
    ],
    [],
  );
  return (
    <DataTable
      columns={columsDataProdi}
      data={data as TDataProdi[]}
      persistTableHead
      noDataComponent={
        <div className="flex flex-col w-full h-screen justify-center items-center">
          <h1 className="font-bold my-2">Data Tidak Tersedia</h1>
          <p>Table akan ditampilkan apabila sudah tersedia data yang diperlukan</p>
        </div>
      }
    />
  );
};

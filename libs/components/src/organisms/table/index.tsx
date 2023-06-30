'use client'
import fakeData from "./DATA.json";
import React from "react";
import { useTable } from 'react-table'

export default function Tabel() {
  const data = React.useMemo(() => fakeData, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "University",
        accessor: "university",
      },
    ],
    []
  );

  const {  headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div >
    <div className="overflow-x-auto p-11">
  <table className="min-w-full divide-y divide-gray-200 border-collapse border border-slate-200">
    <thead>
      {headerGroups.map((headerGroup: any) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <th className="border border-slate-300 py-3 px-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...column.getHeaderProps()}>
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row: any) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell: any) => (
              <td className="border border-slate-300 p-2  text-sm font-medium text-gray-600" {...cell.getCellProps()}>
                {cell.render("Cell")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
    </div>
  );
}

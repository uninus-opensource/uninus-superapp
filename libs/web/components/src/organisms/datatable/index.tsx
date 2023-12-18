import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { FC, ReactElement, useState } from "react";
import { TDataTable } from "./type";
import { TableHead, TableBody, TableWrapper } from "../../molecules";

export const DataTable: FC<TDataTable<Record<string, unknown>>> = (props): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <TableWrapper {...props}>
      <TableHead tableHead={table.getHeaderGroups()} />
      <TableBody tableBody={table.getRowModel()} />
    </TableWrapper>
  );
};

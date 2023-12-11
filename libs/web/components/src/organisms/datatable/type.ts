import { TMetaItem } from "@uninus/entities";
import { ColumnDef } from "@tanstack/react-table";

export type TDataTable<T extends Record<string, unknown>> = {
  data: T[];
  meta: TMetaItem;
  columns: ColumnDef<T>[];
};

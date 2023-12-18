import { TMetaItem } from "@uninus/entities";
import { ChangeEventHandler, DetailedHTMLProps, HTMLAttributes } from "react";

export type TTableWrapper = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  meta?: TMetaItem;
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
};

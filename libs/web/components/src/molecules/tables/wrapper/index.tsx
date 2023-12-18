import { FC, ReactElement } from "react";
import { TTableWrapper } from "./type";
import { Search, Pagination } from "../../../molecules";

export const TableWrapper: FC<TTableWrapper> = (props): ReactElement => {
  return (
    <section className="shadow-md p-4 rounded-lg w-full gap-y-4 flex flex-col">
      <Search {...props} />
      <table {...props} className="border rounded-lg p-2">
        {props.children}
      </table>
      <Pagination {...props} />
    </section>
  );
};

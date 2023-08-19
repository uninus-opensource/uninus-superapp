import { ReactElement, FC } from "react";
import clsx from "clsx";
import { TStatusAlert } from "./type";

export const StatusAlert: FC<TStatusAlert> = ({ status, ...props }): ReactElement => {
  const statusVariant = clsx(
    "border rounded-md mt-7 w-full text-base font-bold text-xs lg:text-base py-4 h-auto flex flex-col justify-evenly mx-auto pl-3 md:pl-5",
    {
      "border-primary-orange text-primary-orange ": status === "pending" || status === "unpaid",
      "border-primary-green text-primary-green   ": status === "success",
      "border-red-7 text-red-7": status === "failed",
    },
  );

  return (
    <div className={statusVariant}>
      <h1>{props.message}</h1>
      <div className="w-[80%]">
        <h2 className="text-grayscale-9 text-xs lg:text-sm font-normal">{props.messageDetails}</h2>
      </div>
    </div>
  );
};

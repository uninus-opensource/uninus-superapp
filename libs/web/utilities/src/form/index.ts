import { clsx } from "clsx";
import { TCommonForm } from "@uninus/entities";

export const inputClassName = ({
  size,
  status,
  preppend,
  append,
}: Pick<TCommonForm, "size" | "status" | "append" | "preppend">): string =>
  clsx(
    "rounded-lg border outline-none w-full focus:outline-none focus:ring-0 ring-0 placeholder:text-[13px]",
    "disabled:bg-gray-100 disabled:placeholder:text-grey-300 disabled:border-gray-200",
    "disable:cursor-not-allowed disabled:bg-grey-100 disabled:select-none disabled:text-gray-300",
    {
      "text-sm placeholder:text-xs pl-2 pr-3 py-2":
        size === "sm" || (!size && !preppend && !append),
      "text-sm placeholder:text-xs pl-8 pr-3 py-2": size === "sm" && preppend && !append,
      "text-sm placeholder:text-xs pl-2 pr-8 py-2": size === "sm" && !preppend && append,
      "text-sm placeholder:text-xs pl-8 pr-8 py-2": size === "sm" && preppend && append,
    },
    {
      "text-base placeholder:text-sm pl-3 pr-4 py-3": size === "md" && !preppend && !append,
      "text-base placeholder:text-sm pl-10 pr-4 py-3": size === "md" && preppend && !append,
      "text-base placeholder:text-sm pl-3 pr-10 py-3": size === "md" && !preppend && append,
      "text-base placeholder:text-sm pl-10 pr-10 py-3": size === "md" && preppend && append,
    },
    {
      "text-lg placeholder:text-base pl-4 pr-5 py-4": size === "lg" && !preppend && !append,
    },
    {
      "bg-grey-50 placeholder:text-grey-300 focus:border-grey-400 border-grey-300 ":
        status === "none" || !status,
      "border-green-400 placeholder:text-green-300 text-green-400 bg-green-50":
        status === "success",
      "placeholder:text-red-400 text-red-400 bg-red-100 border-red-400 focus:border-red-400":
        status === "error",
      "border-yellow-400 placeholder:text-yellow-400 text-yellow-400 bg-yellow-50":
        status === "warning",
    },
  );

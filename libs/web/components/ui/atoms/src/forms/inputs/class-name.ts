import { clsx } from "clsx";
import { TCommonForm } from "@uninus/entities";

export const inputClassName = ({
  size,
  status,
  preppend,
  append,
}: Pick<TCommonForm, "size" | "status" | "append" | "preppend">): string =>
  clsx(
    "rounded-lg border-none outline-none w-full focus:outline-none focus:ring-0 ring-0",
    "disabled:bg-gray-100 disabled:placeholder:text-gray-300 disabled:border-gray-200",
    "disable:cursor-not-allowed disable:opacity-50 disable:select-none disabled:text-gray-300",
    {
      "text-sm placeholder:text-xs pl-2 pr-3 py-2": size === "sm" && !preppend && !append,
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
      "bg-grayscale-2 placeholder:text-grayscale-3 focus:ring-0 focus:border-grayscale-2 ":
        status === "none" || !status,
      "border-green-300 placeholder:text-green-300 text-green-400 bg-green-50":
        status === "success",
      "placeholder:text-red-4 text-red-4 bg-red-1 focus:border-red-4": status === "error",
      "border-yellow-400 placeholder:text-yellow-400 text-yellow-400 bg-yellow-50":
        status === "warning",
    },
  );

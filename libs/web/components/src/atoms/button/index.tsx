import clsx from "clsx";
import { FC, ReactElement } from "react";
import { IButtonProps } from "./interface";
import Link from "next/link";
import { LoadingSpinner } from "../loadings";

export const Button: FC<IButtonProps> = ({
  loading = false,
  size = "sm",
  variant = "filled",
  width = "w-22",
  height = "h-11",
  uppercase = false,
  styling = "",
  ...props
}): ReactElement => {
  const buttonSize = clsx(`text-sm ${styling} ${width} ${height} ${uppercase ? "uppercase" : ""}`, {
    "lg:p-4 p-3": size === "sm",
    "p-5": size === "md",
    "p-6": size === "lg",
  });

  const buttonVariant = clsx(
    "font-black flex items-center justify-center duration-200 rounded-lg disabled:bg-grey-300 disabled:text-grey-400 disabled:cursor-not-allowed",
    {
      "bg-primary-green text-primary-white shadow-sm shadow-grayscale-6  hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-none active:scale-95 ":
        variant === "elevated",
      "bg-primary-green text-primary-white hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-inset ":
        variant === "filled",
      "bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5 active:shadow-inset ":
        variant === "filled-tonal",
      "text-primary-white border-2 border-secondary-green-4 ": variant === "outlined",
      "text-primary-white border-2 border-primary-white ": variant === "outlined-white",
      "text-secondary-green-4 hover:bg-secondary-sky-1 active:bg-secondary-sky-2 ":
        variant === "text-icon",
      "text-primary-white hover:text-slate-3 active:text-slate-4 ": variant === "navlist",
      "fixed bottom-4 right-4 bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5 ":
        variant === "float-bottom-right",
      "active:shadow-inset ": variant === "custom",
      "flex items-center justify-between bg-none hover:bg-green-800 font-semibold hover:opacity-100 ":
        variant === "sidebarlist",
      "text-primary-green font-normal ": variant === "sidebarbutton",
      "bg-primary-white text-primary-green border border-primary-green active:shadow-inset ":
        variant === "green-outline",
      "hover:cursor-wait ": loading,
      "bg-red-7 text-primary-white   active:shadow-inset ": variant === "filled-red",
      "bg-primary-yellow text-primary-white   active:shadow-inset ": variant === "filled-yellow",
      "bg-secondary-green-4 text-primary-white   active:shadow-inset ":
        variant === "filled-green-secondary",
    },
  );

  const className = [...buttonVariant, ...buttonSize].join("");

  return props?.href ? (
    <Link role="link" href={`${props?.href}`}>
      <button
        role="button"
        aria-label="button-component-link"
        data-testid="button"
        {...props}
        className={className}
      >
        {loading ? <LoadingSpinner className="w-5 h-5" /> : props.children}
      </button>
    </Link>
  ) : (
    <button
      role="button"
      aria-label="button-component"
      data-testid="button"
      {...props}
      className={className}
    >
      {loading ? <LoadingSpinner className="w-5 h-5" /> : props.children}
    </button>
  );
};

import { FC, ReactElement } from "react";
import { TLabel } from "./type";
import clsx from "clsx";

export const Label: FC<TLabel> = (props): ReactElement => {
  const className = clsx(
    "flex gap-x-1 text-grey-500 select-none font-medium",
    {
      "text-sm": props.size === "sm" || !props.size,
      "text-base": props.size === "md",
      "text-md": props.size === "lg",
    },
    {
      "text-grey-400 cursor-not-allowed opacity-50": props.disabled,
    },
    props.className,
  );

  return (
    <label data-testid="label" className={className} {...props}>
      {props.children}
      {props.required && (
        <span data-testid="required" className="text-red-700">
          *
        </span>
      )}
    </label>
  );
};

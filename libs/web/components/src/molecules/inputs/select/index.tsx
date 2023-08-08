import { ReactElement } from "react";
import { TSelectProps } from "./types";
import clsx from "clsx";
import { WarningOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { FieldValues, useController } from "react-hook-form";

export const SelectField = <T extends FieldValues>({
  size = "sm",
  ...props
}: TSelectProps<T>): ReactElement => {
  const selectClassName = clsx(
    `border rounded-md outline-none  ${props.width}`,
    {
      "border-green-300 bg-green-100": props.status === "success",
      "border-amber-300 bg-amber-100": props.status === "warning",
      "border-red-300 bg-red-100": props.status === "error",
      "border-slate-300 bg-slate-2": props.status === "none",
    },
    {
      "p-1.5 text-sm": size === "sm",
      "p-2 text-base": size === "md",
    },
  );

  const labelClassName = clsx("mt-1", {
    "text-xs font-semibold": size === "sm",
    "text-base font-bold": size === "md",
  });

  const messageClassName = clsx(
    "ml-2",
    {
      "text-green-4": props.status === "success",
      "text-amber-3": props.status === "warning",
      "text-red-4": props.status === "error",
      "text-slate-4": props.status === "none",
    },
    {
      "text-sm": size === "sm",
      "text-base": size === "md",
    },
  );

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={props.name} className={labelClassName}>
        {props.label}
        {props.required && <span className="ml-1 font-bold text-primary-green">*</span>}
      </label>
      <select
        className={selectClassName}
        defaultValue={props.placeholder}
        {...{ ...props, ...field }}
      >
        <option disabled>{props.placeholder}</option>
        {props?.options?.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.message && (
        <span className={messageClassName}>
          {props.status === "error" && (
            <CloseCircleOutlined className="inline-block mr-1 text-red-400" />
          )}
          {props.status === "warning" && (
            <WarningOutlined className="inline-block mr-1 text-amber-300" />
          )}
          {props.status === "success" && (
            <CheckCircleOutlined className="inline-block mr-1 text-green-400" />
          )}
          {props.message}
        </span>
      )}
    </div>
  );
};

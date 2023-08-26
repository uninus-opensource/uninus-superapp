import { ReactElement } from "react";
import { TSelectProps } from "./types";
import clsx from "clsx";
import { AiFillWarning } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { FieldValues, useController } from "react-hook-form";
import { SELECT_SIZE, SELECT_STATUS } from "./enum";

export const SelectField = <T extends FieldValues>({
  size = SELECT_SIZE.SM,
  ...props
}: TSelectProps<T>): ReactElement => {
  const selectClassName = clsx(
    "border rounded-md outline-none",
    {
      "border-green-300 bg-green-100": props.status === SELECT_STATUS.SUCCESS,
      "border-amber-300 bg-amber-100": props.status === SELECT_STATUS.WARNING,
      "border-red-300 bg-red-100": props.status === SELECT_STATUS.ERROR,
      "border-slate-300 bg-slate-2": props.status === SELECT_STATUS.NONE,
    },
    {
      "p-1.5 text-sm": size === SELECT_SIZE.SM,
      "p-2 text-base": size === SELECT_SIZE.MD,
    },
  );

  const labelClassName = clsx("mt-1", {
    "text-xs font-semibold": size === SELECT_SIZE.SM,
    "text-base font-bold": size === SELECT_SIZE.MD,
  });

  const messageClassName = clsx("ml-2", {
    "text-green-4": props.status === SELECT_STATUS.SUCCESS,
    "text-amber-3": props.status === SELECT_STATUS.WARNING,
    "text-red-4": props.status === SELECT_STATUS.ERROR,
    "text-slate-4": props.status === SELECT_STATUS.NONE,
  });

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name} className={labelClassName}>
        {props.label}
        {props.required && <span className="ml-1 font-bold text-primary-green">*</span>}
      </label>
      <select disabled={props.disabled} role="select" className={selectClassName} {...field}>
        <option disabled value={props.placeholder}>
          {props.placeholder}
        </option>
        {props?.options?.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.message && (
        <span className={messageClassName}>
          {props.status === SELECT_STATUS.ERROR && (
            <BiSolidErrorCircle className="inline-block mr-1 text-red-400" />
          )}
          {props.status === SELECT_STATUS.WARNING && (
            <AiFillWarning className="inline-block mr-1 text-amber-300" />
          )}
          {props.status === SELECT_STATUS.SUCCESS && (
            <AiFillCheckCircle className="inline-block mr-1 text-green-400" />
          )}
          {props.message}
        </span>
      )}
    </div>
  );
};

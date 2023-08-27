import { ReactElement, forwardRef, Ref } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TSelectFieldProps, TSelectOption } from "./types";
import Select, { GroupBase, MultiValue, SelectInstance, SingleValue } from "react-select";
import { AiFillCheckCircle, AiFillWarning } from "react-icons/ai";
import { BiSolidErrorCircle } from "react-icons/bi";
import clsx from "clsx";
import { SELECT_SIZE, SELECT_STATUS } from "./enum";

export * from "./types";

type TS<T extends FieldValues> = TSelectFieldProps<T>;

export const SelectOption = forwardRef(
  <T extends FieldValues>(
    props: TS<T>,
    ref?: Ref<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>,
  ): ReactElement => {
    const selectClassName = clsx(
      "text-primary-black rounded-md outline-none",
      {
        "border-green-300 bg-green-100": props.status === SELECT_STATUS.SUCCESS,
        "border-amber-300 bg-amber-100": props.status === SELECT_STATUS.WARNING,
        "border-red-300 bg-red-100": props.status === SELECT_STATUS.ERROR,
        "border-slate-300 bg-slate-2": props.status === SELECT_STATUS.NONE,
      },
      {
        "p-1.5 text-sm": props.size === SELECT_SIZE.SM,
        "lg:w-[25vw] md:w-[33vw] w-[240px] text-base": props.size === SELECT_SIZE.MD,
        "w-full text-base": props.size === SELECT_SIZE.LG,
      },
    );

    const labelClassNameClsx = clsx("mt-1", {
      "text-xs font-semibold": props.size === SELECT_SIZE.SM,
      "text-base font-bold": props.size === SELECT_SIZE.MD,
    });

    const messageClassName = clsx("ml-2", {
      "text-green-4": props.status === SELECT_STATUS.SUCCESS,
      "text-amber-3": props.status === SELECT_STATUS.WARNING,
      "text-red-4": props.status === SELECT_STATUS.ERROR,
      "text-slate-4": props.status === SELECT_STATUS.NONE,
    });

    const { field } = useController({
      ...props,
    });

    const handleChange = (payload: MultiValue<TSelectOption> | SingleValue<TSelectOption>) => {
      const pay = payload as TSelectOption;
      field.onChange(pay?.value);
    };

    return (
      <div className="flex flex-col">
        <label className={props.labelClassName ?? labelClassNameClsx}>
          {props.labels}{" "}
          {props.required && <span className="ml-1 font-bold text-primary-green">*</span>}
        </label>
        <Select
          {...props}
          className={selectClassName ?? props.className}
          value={props.options.find((option) => option.value === field.value)}
          onChange={handleChange}
          ref={ref}
          isDisabled={props.disabled}
        />
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
  },
);

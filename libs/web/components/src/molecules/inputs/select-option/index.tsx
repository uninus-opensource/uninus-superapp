import { ReactElement, forwardRef, Ref, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TSelectFieldProps, TSelectOption } from "./types";
import Select, { GroupBase, MultiValue, SelectInstance, SingleValue } from "react-select";
import { AiFillCheckCircle, AiFillWarning, AiOutlineCaretDown } from "react-icons/ai";
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

    const messageClassName = clsx("ml-2 mt-1 text-xs", {
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

    const [dropdown, setDropDown] = useState<boolean>(false);
    const arrowRender = () => {
      return (
        <AiOutlineCaretDown
          className={`mr-3 text-xl ${dropdown ? "rotate-180" : "rotate-0"} duration-200`}
        />
      );
    };

    return (
      <div className="flex flex-col">
        <label className={props.labelClassName ?? labelClassNameClsx}>
          {props.labels}{" "}
          {props.required && <span className="ml-1 font-bold text-primary-green">*</span>}
        </label>
        <Select
          {...props}
          className={`${selectClassName} ${props.className}`}
          value={props.options.find((option) => option.value === field.value)}
          onChange={handleChange}
          ref={ref}
          isDisabled={props?.disabled}
          onMenuOpen={() => setDropDown(true)}
          onMenuClose={() => setDropDown(false)}
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#DEDEDE" : "#F2F2F2",
              color: "black",
              border: "0px",
              outline: "none",
              boxShadow: "none",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#DEDEDE" : "#F2F2F2",
              color: "black",
              boxShadow: "none",
            }),
          }}
          components={{
            DropdownIndicator: arrowRender,
            IndicatorSeparator: () => {
              return null;
            },
          }}
        />
        {props.message && (
          <span className={messageClassName}>
            {props.status === "error" && (
              <BiSolidErrorCircle className="inline-block mr-1 text-red-5" />
            )}
            {props.status === "warning" && (
              <AiFillWarning className="inline-block mr-1 text-primary-yellow" />
            )}
            {props.status === "success" && (
              <AiFillCheckCircle className="inline-block mr-1 text-primary-green" />
            )}
            {props.message}
          </span>
        )}
      </div>
    );
  },
);

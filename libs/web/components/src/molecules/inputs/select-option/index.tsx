import { ReactElement, forwardRef, Ref, useState, useEffect, CSSProperties } from "react";
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

    const messageClassName = clsx("text-left md:ml-2 mt-1 text-xs", {
      "text-green-4": props.status === SELECT_STATUS.SUCCESS,
      "text-amber-3": props.status === SELECT_STATUS.WARNING,
      "text-red-4": props.status === SELECT_STATUS.ERROR,
      "text-slate-4": props.status === SELECT_STATUS.NONE,
    });

    const { field } = useController({
      ...props,
    });

    const [color, setColor] = useState<string | null>(null);
    const [textColor, setTextColor] = useState<string | null>(null);
    // const [value, setValue] = useState<string | null>(null);

    const handleChange = (payload: MultiValue<TSelectOption> | SingleValue<TSelectOption>) => {
      const pay = payload as TSelectOption;
      setColor(pay?.color as string);
      field.onChange(pay?.value);

      // console.log(pay?.value);
    };

    const [dropdown, setDropDown] = useState<boolean>(false);
    const arrowRender = () => {
      return (
        <AiOutlineCaretDown
          className={`mr-3 text-xl ${dropdown ? "rotate-180" : "rotate-0"} duration-200`}
        />
      );
    };

    useEffect(() => {
      if (props.renderSelectColor) {
        props.options.find((option) => option.value === field.value)
          ? setColor(props.options.find((option) => option.value === field.value)?.color as string)
          : setColor(null);

        props.options.find((option) => option.value === field.value)
          ? setTextColor(
              props.options.find((option) => option.value === field.value)?.textColor as string,
            )
          : setTextColor(null);
      }
    }, [field.value, props.options, props.renderSelectColor]);

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
            control: (base, state) => ({
              ...(base as unknown as CSSProperties),

              backgroundColor: props.options?.map((option) => option.color)
                ? color || props.selectColor || "#F2F2F2"
                : state.isFocused
                  ? "#DEDEDE"
                  : "#F2F2F2",
              color: "black",
              border: props.isBordered ? "2px 2px 2px 2px" : "none",
              borderColor: "#989898",
              outline: "none",
              boxShadow: "none",
              fontSize: "14px",
            }),
            option: (base, state) => ({
              ...(base as unknown as CSSProperties),
              backgroundColor: state.isSelected ? "#DEDEDE" : props.optionColor || "#F2F2F2",
              color: "black",
              boxShadow: "none",
              fontSize: "14px",
            }),
            singleValue: (base) => ({
              ...(base as unknown as CSSProperties),
              color: textColor || props.textColor || "black",
              boxShadow: "none",
              fontSize: "14px",
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

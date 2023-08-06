"use client";
import { ReactElement, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TTextFieldProps } from "./types";
import clsx from "clsx";
import { MdCheck } from "react-icons/md";
import { EyeOpen, EyeSlash } from "../../../atoms/";

export const TextField = <T extends FieldValues>({
  variant = "md",
  type = "text",
  status = "none",
  isTextArea = false,
  textAreaRow = 12,
  textAreaCols = 26,
  inputWidth = "w-full",
  inputHeight = "h-auto",
  inputBackground = "bg-grayscale-2 bg-opacity-30",
  messageClassName = "",

  ...props
}: TTextFieldProps<T>): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => {
    setShowPassword((prevState) => !prevState);
  };

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  const labelVariant = clsx("text-black font-medium", {
    "text-base": variant === "lg",
    "text-xs md:text-sm xl:text-md lg:text-xs 2xl:text-lg font-semibold": variant === "md",
    "text-xs ": variant === "sm",
  });

  const inputStatus = clsx(`outline-none ${inputWidth} ${inputHeight} `, {
    "ring-1 ring-red-4 bg-red-100 placeholder:text-red-3 border-none focus:border-grayscale-2 focus:ring-red-4":
      status === "error",
    "ring-1 ring-secondary-green-1 bg-green-100 placeholder:text-secondary-green-1":
      status === "success",
    "ring-1 ring-primary-yellow bg-yellow-100 placeholder:text-primary-yellow":
      status === "warning",
    "ring-0  bg-grayscale-2 placeholder:text-grayscale-3 focus:ring-0 focus:border-grayscale-2 border-none":
      status === "none" || status === undefined,
  });

  const inputVariant = clsx(
    `${inputBackground} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
    {
      "py-4 rounded-lg placeholder:text-base text-base": variant === "lg",
      "xl:py-3 lg:py-2 rounded-md placeholder:text-xs text-sm": variant === "md",
      "py-2 rounded-sm placeholder:text-xs text-xs": variant === "sm",
      "p-5 text-center rounded-2xl placeholder:text-xs placeholder:text-slate-300 text-md md:text-xl appearance-none":
        variant === "otp",
      "xl:py-3 lg:py-2 rounded-r-md placeholder:text-xs text-sm": variant === "telp",
    },
  );

  const inputExtras = clsx({
    "pl-[40px]": props.prepend,
    "pr-[40px]": props.append,
    "px-4": !props.append && !props.prepend,
  });

  const messageStatus = clsx({
    "text-red-5": status === "error",
    "text-primary-yellow": status === "warning",
    "text-secondary-green-1": status === "success",
    hidden: status === "none",
  });

  return (
    <section className="flex flex-col w-auto my-1 gap-y-2 ">
      {props.label && (
        <label htmlFor={props.name} className={`${labelVariant} ${props.labelclassname}`}>
          {props.label}
          {props.required && <span className="ml-1 font-bold text-primary-green">*</span>}
        </label>
      )}

      <section className="relative flex items-center w-auto">
        {props.prepend && (
          <label
            className="items-center inset-0 absolute flex items justify-center w-[40px]"
            htmlFor={props.name}
          >
            {props.prepend}
          </label>
        )}
        {!isTextArea ? (
          <input
            type={type === "password" ? (!showPassword ? type : "text") : type}
            {...{ ...props, ...field }}
            className={`${inputStatus} ${inputVariant} ${inputExtras}`}
            maxLength={props.maxlenght}
            inputMode={props.inputMode}
          />
        ) : (
          <textarea
            rows={textAreaRow}
            {...{ ...props, ...field }}
            className={`bg-opacity-30 w-full ${inputStatus} ${props.className}`}
            cols={textAreaCols}
          />
        )}

        <div className="absolute flex space-x-2 transform -translate-y-1/2 right-4 top-1/2">
          {status === "success" && <MdCheck className="text-green-400" size={20} />}
          {type === "password" && (
            <button type="button" onClick={toggleShowPassword}>
              {type === "password" && !showPassword ? <EyeSlash /> : <EyeOpen />}
            </button>
          )}
        </div>

        {props.append && (
          <label className="flex items-end justify-center w-auto " htmlFor={props.name}>
            {props.append}
          </label>
        )}
      </section>

      <div className="flex flex-col items-start w-full gap-x-1">
        <span className={labelVariant}>{props.hint}</span>
        <span className={`${messageStatus} xl:text-xs lg:text-[8px] text-xs ${messageClassName}`}>
          {props.message}
        </span>
      </div>
    </section>
  );
};

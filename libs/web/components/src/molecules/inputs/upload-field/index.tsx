"use client";
import { ReactElement } from "react";
import { TUploadFile } from "./types";
import { FieldValues, useController } from "react-hook-form";
import clsx from "clsx";
import { AiOutlineCheck } from "react-icons/ai";
export const UploadField = <T extends FieldValues>({
  layoutInputClassName = "flex flex-col justify-center",
  ...props
}: TUploadFile<T>): ReactElement => {
  const {
    field: { onChange, value, ref },
  } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });
  const inputFileVariants = clsx(
    `file:bg-primary-green file:text-primary-white file:rounded-[3px] file:border-none w-[59vw] md:w-[29vw] lg:w-[22vw] 2xl:w-[18vw] xl:w-[17vw] file:cursor-pointer `,
    {
      "file:p-2 lg:text-base text-xs": props.variant === "default",
      "hidden opacity-0 ": props.variant === "custom",
    },
  );
  const labelFileVariants = clsx("text-xs lg:text-base text-center", {
    "flex justify-center items-center text-primary-white bg-primary-green w-[17vw] md:w-[10vw] px-1 lg:px-3 py-2 rounded cursor-pointer":
      props.labelClassName === "labelText",
    "flex justify-center items-center text-primary-green bg-slate-3 w-[17vw] md:w-[10vw] px-1 lg:px-3 py-2 rounded cursor-pointer":
      props.labelClassName === "labelTextUploaded",
    "flex justify-center items-center text-slate-5 bg-slate-3 w-[17vw] md:w-[10vw] px-1 lg:px-3 py-2 rounded cursor-not-allowed":
      props.labelClassName === "labelTextDisabled",
    "rounded-full w-12 h-12 bg-primary-white text-primary-green z-15 relative bottom-12 left-12 md:left-14 flex items-center justify-center cursor-pointer":
      props.labelClassName === "iconUpload",
    "flex justify-center items-center text-slate-5 bg-slate-3 w-[25vw] md:w-[15vw] lg:w-[10vw] px-1 lg:px-3 py-2 rounded cursor-not-allowed":
      props.labelClassName === "labelTextDisabledLarge",
    "flex justify-center items-center text-primary-green bg-slate-3 w-[25vw] md:w-[15vw] lg:w-[10vw] px-1 lg:px-3 py-2 rounded cursor-pointer":
      props.labelClassName === "labelTextUploadedLarge",
    "flex justify-center items-center text-primary-white bg-primary-green w-[25vw] md:w-[15vw] lg:w-[10vw] px-1 lg:px-3 py-2 rounded cursor-pointer":
      props.labelClassName === "labelTextLarge",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange(file);
  };

  return (
    <div className={props.className}>
      {value ? (
        <img
          src={URL.createObjectURL(value) || ""}
          alt=""
          className={`${props.preview ? props.previewImage : "hidden"}`}
        />
      ) : (
        <div>
          <img src={props?.defaultImage || ""} alt="" className={props.previewImage} />
        </div>
      )}

      <div className={layoutInputClassName}>
        <div className="flex">
          {props.label && <h3 className="font-bold text-xs text-left">{props.label}</h3>}
          {props.required && (
            <span className="relative ml-1 font-bold text-primary-green bottom-1">*</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*,.pdf"
          id={props.name}
          name={props.name}
          onChange={handleFileChange}
          ref={ref}
          className={inputFileVariants}
          disabled={props.isDisabled}
        />
        <label htmlFor={props.name} className={labelFileVariants}>
          {value && !props.previewImage ? (
            <AiOutlineCheck className="text-2xl text-center" />
          ) : props.isDisabled ? (
            <AiOutlineCheck className="text-2xl text-center" />
          ) : (
            props.inputLabel
          )}
        </label>
        {props.message && (
          <span className="text-sm text-red-4 font-semibold relative mb-5 md:mb-0 -mt-5">
            {props.message}
          </span>
        )}
      </div>
    </div>
  );
};

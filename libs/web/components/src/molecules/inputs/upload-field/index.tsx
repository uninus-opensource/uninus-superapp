"use client";
import { FC, ReactElement } from "react";
import { TUploadFile } from "./types";
import { useController } from "react-hook-form";
import clsx from "clsx";
export const UploadField: FC<TUploadFile> = (props): ReactElement => {
  const {
    field: { onChange, value, ref },
  } = useController({
    ...props,
    defaultValue: null,
  });
  const inputFileVariants = clsx(
    `file:bg-primary-green file:text-primary-white file:rounded-[3px] file:border-none w-[59vw] md:w-[29vw] lg:w-[22vw] 2xl:w-[18vw] xl:w-[17vw] file:cursor-pointer `,
    {
      "file:p-2 lg:text-base text-xs": props.variant === "default",
      "hidden p-3 opacity-0 -z-10": props.variant === "custom",
    },
  );

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
        <div className="w-auto h-auto ">
          <img src={props?.defaultImage || ""} alt="" className={props.previewImage} />
        </div>
      )}
      {props.variant === "default" ? (
        <input
          type="file"
          id="files"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          ref={ref}
          className={inputFileVariants}
        />
      ) : (
        <>
          <input
            type="file"
            accept="image/*,.pdf"
            id="files"
            onChange={handleFileChange}
            ref={ref}
            className={inputFileVariants}
          />
          <label
            htmlFor="files"
            className="px-1 py-2 bg-primary-green text-[50%]  lg:text-base w-[20vw] md:w-[29vw] lg:w-[22vw] 2xl:w-[18vw] xl:w-full cursor-pointer text-primary-white text-center rounded z-10"
          >
            Choose File
          </label>
        </>
      )}
    </div>
  );
};

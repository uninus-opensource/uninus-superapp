"use client";
import { FC, ReactElement } from "react";
import { TUploadFile } from "./types";
import { useController } from "react-hook-form";

export const UploadField: FC<TUploadFile> = (props): ReactElement => {
  const {
    field: { onChange, value, ref },
  } = useController({
    ...props,
    defaultValue: null,
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
        <div className="w-auto h-auto">
          <img src={props?.defaultImage || ""} alt="" className={props.previewImage} />
        </div>
      )}
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        ref={ref}
        className={props.classNameField}
      />
    </div>
  );
};

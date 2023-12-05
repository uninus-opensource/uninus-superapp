import { Fragment, ReactElement } from "react";
import { AiFillFileText, AiOutlineUpload } from "react-icons/ai";
import { TUploadFieldV2Props } from "./types";
import { FieldValues, useController } from "react-hook-form";

export const UploadFieldV2 = <T extends FieldValues>({
  ...props
}: TUploadFieldV2Props<T>): ReactElement => {
  const {
    field: { onChange, value, ref },
  } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onChange(file);
  };
  return (
    <div className="w-[26.5rem] flex items-center px-4 py-3 gap-5 shadow-md rounded-md border-2 border-slate-1">
      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        name={props.name}
        id={props.name}
        className="hidden opacity-0"
        onChange={handleFileChange}
        disabled={props.disabled}
        ref={ref}
      />
      <label htmlFor={props.name}>
        {value ? (
          <AiFillFileText className="text-5xl cursor-pointer hover:text-secondary-green-4" />
        ) : (
          <AiOutlineUpload className="text-[2.5rem] cursor-pointer ml-1 hover:text-secondary-green-4" />
        )}
      </label>
      <div className="w-full h-full flex flex-col justify-center gap-2 font-semibold text-xs">
        {value ? (
          <Fragment>
            <p>UN29-123_Transkrip2023.docx</p>
            <p>800kb</p>
          </Fragment>
        ) : (
          <Fragment>
            <p>Mohon Unggah File Terlebih dahulu</p>
            <div className="flex flex-col text-[10px] gap-1 font-normal">
              <p>Unggah File .pdf, .doc, .docx</p>
              <p>File Maximal 2 MB</p>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

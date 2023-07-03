import { ReactElement, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TUploadFieldProps } from './types';

export const UploadField = <T extends FieldValues>(
  props: TUploadFieldProps<T>
): ReactElement => {
  const { field } = useController(props);
  const [getName, setName] = useState('');
  return (
    <section className="flex flex-col w-auto my-1 gap-y-2 ">
      {props.label && (
        <label
          htmlFor={props.name}
          className={`text-[#000] ${
            props.variant === 'lg'
              ? 'text-[18px] font-bold'
              : props.variant === 'md'
              ? 'text-[16px] font-bold'
              : props.variant === 'sm'
              ? 'text-[14px] font-bold'
              : ''
          } `}
        >
          {props.label}
          {props.required && (
            <span className="ml-1 font-bold  text-error-600">*</span>
          )}
        </label>
      )}

      <label className="mb-2" htmlFor={props.name}>
        <section
          className={`${
            props.status === 'error' && ' border-error-400'
          } flex overflow-hidden border mb-1 rounded-lg ${props.className}`}
        >
          <div className="w-full flex items-center ">
            <h1 className="bg-primary-400 w-fit text-white py-2 cursor-pointer hover:bg-primary-600 transition-colors ease-in-out duration-300 px-4 rounded-l-lg">
              Pilih File
            </h1>
            <p
              className={`${
                props.status === 'error' ? 'text-error-500 italic' : ''
              } px-4 text-xs`}
            >
              {getName || props.files ? (
                <span>
                  {getName || props.files}
                  {props.status === 'error' && `(${props.message})`}
                </span>
              ) : (
                'Tidak ada file yang dipilih'
              )}
            </p>
          </div>
          <div className="min-w-[120px] lg:min-w-[150px]">
            <p className="px-4 py-3 lg:py-2 bg-[#E9F6FD] text-neutral-600 text-xs lg:text-sm">
              {props.accepted}
            </p>
          </div>
        </section>
        <span
          className={`${
            props.status === 'error'
              ? 'text-error-base'
              : props.status === 'success'
              ? 'text-success-base'
              : props.status === 'warning'
              ? 'text-warning-base'
              : ''
          } text-xs`}
        >
          {props.message}
        </span>
      </label>

      <input
        {...props}
        onChange={(event) => {
          field.onChange(event.target.files);
          setName(event.target?.files?.[0]?.name as string);
          props?.onChange?.(event);
        }}
        id={props.name}
        type="file"
        hidden
      />
    </section>
  );
};

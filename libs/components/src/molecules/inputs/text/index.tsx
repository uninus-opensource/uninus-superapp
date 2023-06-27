'use client';
import { ReactElement, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TTextFieldProps } from './types';
import clsx from 'clsx';
import { MdCheck } from 'react-icons/md';
import { EyeOpen, EyeSlash } from 'libs/components/src/atoms';

export const TextField = <T extends FieldValues>({
  variant = 'md',
  type = 'text',
  status = 'none',
  isTextArea = false,
  textAreaRow = 12,
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

  const labelVariant = clsx('text-black font-medium', {
    'text-md': variant === 'lg',
    'text-sm': variant === 'md',
    'text-xs': variant === 'sm',
  });

  const inputStatus = clsx('outline-none w-full ', {
    'ring-1 ring-red-400 bg-red-100 placeholder:text-red-400':
      status === 'error',
    'ring-1 ring-green-400 bg-green-100 placeholder:text-green-400':
      status === 'success',
    'ring-1 ring-yellow-400 bg-yellow-100 placeholder:text-yellow-400':
      status === 'warning',
    'ring-1 ring-gray-400 bg-gray-100 placeholder:text-gray-400':
      status === 'none' || status === undefined,
  });

  const inputVariant = clsx({
    'py-4 rounded-lg placeholder:text-md text-md': variant === 'lg',
    'py-3 rounded-md placeholder:text-sm text-sm': variant === 'md',
    'py-2 rounded-md placeholder:text-xs text-xs': variant === 'sm',
  });

  const inputExtras = clsx({
    'pl-[40px]': props.prepend,
    'pr-[40px]': props.append,
    'px-4': !props.append && !props.prepend,
  });

  const messageStatus = clsx({
    'text-red-400': status === 'error',
    'text-yellow-400': status === 'warning',
    'text-green-400': status === 'success',
    hidden: status === 'none',
  });

  return (
    <section className="flex flex-col w-auto my-1 gap-y-2 ">
      {props.label && (
        <label
          htmlFor={props.name}
          className={`${labelVariant} ${props.labelClassName}`}
        >
          {props.label}
          {props.required && (
            <span className="ml-1 font-bold text-red-600">*</span>
          )}
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
            type={type === 'password' ? (!showPassword ? type : 'text') : type}
            {...{ ...props, ...field }}
            className={`${inputStatus} ${inputVariant} ${inputExtras}`}
          />
        ) : (
          <textarea
            rows={textAreaRow}
            {...{ ...props, ...field }}
            className={`w-full ${inputStatus}  ${props.className}`}
          />
        )}

        <div className="absolute flex space-x-2 transform -translate-y-1/2 right-4 top-1/2">
          {status === 'success' && (
            <MdCheck className="text-green-400" size={20} />
          )}
          {type === 'password' && (
            <button type="button" onClick={toggleShowPassword}>
              {type === 'password' && !showPassword ? (
                <EyeSlash />
              ) : (
                <EyeOpen />
              )}
            </button>
          )}
        </div>

        {props.append && (
          <label
            className="flex items-end justify-center w-auto "
            htmlFor={props.name}
          >
            {props.append}
          </label>
        )}
      </section>

      <div className="flex flex-col items-start w-full gap-x-1">
        <span className={labelVariant}>{props.hint}</span>
        <span className={`${messageStatus} text-xs`}>{props.message}</span>
      </div>
    </section>
  );
};

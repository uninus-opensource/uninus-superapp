import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TUploadFieldProps } from './types';
import clsx from 'clsx';

export const UploadField = <T extends FieldValues>({
  variant = 'md',
  ...props
}: TUploadFieldProps<T>): ReactElement => {
  const inputVariant = clsx(
    'block text-gray-500 file:mr-4 w-full file:rounded-lg file:border-0 file:text-center file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 ',
    {
      'file:text-md file:px-3 file:py-2 ': variant === 'lg',
      'file:text-sm file:px-3 file:py-1 ': variant === 'md',
      'file:text-xs file:px-2 file:py-1 ': variant === 'sm',
    }
  );

  const labelVariant = clsx('text-black font-medium ', {
    'text-md ': variant === 'lg',
    'text-sm ': variant === 'md',
    'text-xs ': variant === 'sm',
  });

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <section className="flex flex-col gap-y-1">
      {props.label && (
        <label htmlFor={props.name} className={`${labelVariant}`}>
          {props.label}
          {props.required && (
            <span className="ml-1 font-bold text-red-600">*</span>
          )}
        </label>
      )}
      <input
        {...{ ...props, ...field }}
        className={`${inputVariant}`}
        type="file"
      />
    </section>
  );
};

import React, { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TCheckBoxProps } from './type';
import {
  CHECKBOX_SIZE,
  CHECKBOX_VARIANT,
  LABEL_SIZE,
  STATUS_MESSAGE,
} from './enum';
import clsx from 'clsx';

export const CheckBox = <T extends FieldValues>({
  variant = CHECKBOX_VARIANT.PRIMARY,
  size = CHECKBOX_SIZE.SM,
  labelSize = LABEL_SIZE.SM,
  messageStatus,
  ...props
}: TCheckBoxProps<T>): ReactElement => {
  const checkboxSize = clsx('rounded-sm p-2', {
    'w-3 h-3': size === CHECKBOX_SIZE.SM,
    'w-4 h-4': size === CHECKBOX_SIZE.MD,
    'w-5 h-5': size === CHECKBOX_SIZE.LG,
  });

  const checkboxVariant = clsx(
    'bg-gray-300 border-gray-300 appearance-none checked:scale-110 duration-300',
    {
      'checked:bg-green-400 text-green-600':
        variant === CHECKBOX_VARIANT.PRIMARY,
      'checked:bg-red-400 text-red-600': variant === CHECKBOX_VARIANT.ERROR,
      'checked:bg-yellow-400 text-yellow-600':
        variant === CHECKBOX_VARIANT.WARNING,
    }
  );

  const lblSize = clsx('ml-2 font-medium text-black', {
    'text-xs': labelSize === LABEL_SIZE.SM,
    'text-sm': labelSize === LABEL_SIZE.MD,
    'text-lg': labelSize === LABEL_SIZE.LG,
  });

  const statusMessage = clsx('text-sm font-semibold', {
    'text-green-500': messageStatus === STATUS_MESSAGE.SUCCESS,
    'text-red-500': messageStatus === STATUS_MESSAGE.ERROR,
    'text-yellow-500': messageStatus === STATUS_MESSAGE.WARNING,
  });

  const className = `${checkboxSize} ${checkboxVariant}`;

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <section className="flex flex-col items-center gap-1">
      <div className="flex items-center">
        <input
          type="checkbox"
          className={className}
          {...{ ...props, ...field }}
        />
        <label htmlFor={props.name} className={lblSize}>
          {props.label}
        </label>
      </div>
      {invalid && <span className={statusMessage}>{error?.message}</span>}
    </section>
  );
};

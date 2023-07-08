import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TCheckBoxProps } from './type';
import { CHECKBOX_SIZE, CHECKBOX_VARIANT, LABEL_SIZE } from './enum';
import clsx from 'clsx';

export const CheckBox = <T extends FieldValues>({
  variant = CHECKBOX_VARIANT.PRIMARY,
  size = CHECKBOX_SIZE.SM,
  labelSize = LABEL_SIZE.SM,

  ...props
}: TCheckBoxProps<T>): ReactElement => {
  const checkboxSize = clsx('p-2', {
    'w-3 h-3': size === CHECKBOX_SIZE.SM,
    'w-4 h-4': size === CHECKBOX_SIZE.MD,
    'w-5 h-5': size === CHECKBOX_SIZE.LG,
  });

  const checkboxVariant = clsx(
    'bg-gray-300 border-gray-300 checked:scale-110 duration-300 rounded-full',
    {
      'accent-primary-green focus:accent-green-400 rounded-full text-primary-green focus:ring-0 ring-0 ring-primary-white':
        variant === CHECKBOX_VARIANT.PRIMARY,
      'accent-red-300 focus:accent-red-400': variant === CHECKBOX_VARIANT.ERROR,
      'accent-yellow-300 focus:accent-yellow-400':
        variant === CHECKBOX_VARIANT.WARNING,
    }
  );

  const lblSize = clsx('ml-2 font-medium text-black', {
    'text-xs': labelSize === LABEL_SIZE.SM,
    'text-sm': labelSize === LABEL_SIZE.MD,
    'text-lg': labelSize === LABEL_SIZE.LG,
  });

  const className = `${checkboxSize} ${checkboxVariant}`;

  const { field } = useController({
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
    </section>
  );
};

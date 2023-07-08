import { ReactElement } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TRadioButtonProps } from './type';
import { RADIO_BUTTON_SIZE, RADIO_BUTTON_VARIANT, LABEL_SIZE } from './enum';
import clsx from 'clsx';

export const RadioButton = <T extends FieldValues>({
  variant = RADIO_BUTTON_VARIANT.PRIMARY,
  size = RADIO_BUTTON_SIZE.SM,
  labelSize = LABEL_SIZE.SM,
  ...props
}: TRadioButtonProps<T>): ReactElement => {
  const radioButtonSize = clsx('rounded-full p-2', {
    'w-3 h-3': size === RADIO_BUTTON_SIZE.SM,
    'w-4 h-4': size === RADIO_BUTTON_SIZE.MD,
    'w-5 h-5': size === RADIO_BUTTON_SIZE.LG,
  });

  const radioButtonVariant = clsx(
    'bg-gray-300 border-gray-300 checked:scale-110 duration-300',
    {
      'accent-green-300 focus:accent-green-400':
        variant === RADIO_BUTTON_VARIANT.PRIMARY,
      'accent-red-300 focus:accent-red-400':
        variant === RADIO_BUTTON_VARIANT.ERROR,
      'accent-yellow-300 focus:accent-yellow-400':
        variant === RADIO_BUTTON_VARIANT.WARNING,
    }
  );

  const lblSize = clsx('ml-2 font-medium text-black', {
    'text-xs': labelSize === LABEL_SIZE.SM,
    'text-sm': labelSize === LABEL_SIZE.MD,
    'text-lg': labelSize === LABEL_SIZE.LG,
  });

  const className = `${radioButtonSize} ${radioButtonVariant}`;

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
          type="radio"
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

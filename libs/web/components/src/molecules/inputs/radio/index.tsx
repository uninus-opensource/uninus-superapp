import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TRadioButtonProps } from "./types";

import clsx from "clsx";
import { LABEL_SIZE, RADIO_SIZE, RADIO_VARIANT } from "./enum";
export const RadioButton = <T extends FieldValues>({
  variant = RADIO_VARIANT.PRIMARY,
  size = RADIO_SIZE.SM,
  labelSize = LABEL_SIZE.SM,
  disabled = false,
  ...props
}: TRadioButtonProps<T>): ReactElement => {
  const radioButtonSize = clsx("rounded-full p-2", {
    "w-3 h-3": size === RADIO_SIZE.SM,
    "w-4 h-4": size === RADIO_SIZE.MD,
    "w-5 h-5": size === RADIO_SIZE.LG,
  });

  const radioButtonVariant = clsx(
    "bg-grayscale-4 border-grayscale-8 duration-300 appearance-none focus:bg-primary-green focus:ring-primary-green focus:text-primary-green",
    {
      "checked:bg-primary-green ": variant === RADIO_VARIANT.PRIMARY,
      "accent-primary-yellow focus:accent--primary-yellow": variant === RADIO_VARIANT.WARNING,
    },
  );

  const lblSize = clsx("ml-2 font-medium text-primary-black", {
    "text-xs": labelSize === LABEL_SIZE.SM,
    "text-sm": labelSize === LABEL_SIZE.MD,
    "text-lg": labelSize === LABEL_SIZE.LG,
  });

  const className = `${radioButtonSize} ${radioButtonVariant}`;

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <section className="flex flex-col gap-y-2 xl:gap-y-2">
      <h3 className="text-xs font-semibold">
        {props.fieldName} {props.required && <span className="text-primary-green">*</span>}
      </h3>
      <div className="flex items-center">
        <input
          data-testid="radio-button"
          type="radio"
          className={className}
          {...field}
          id={props.id}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          defaultChecked={props.defaultChecked}
          disabled={disabled}
        />
        <label htmlFor={props.id} className={lblSize}>
          {props.label}
        </label>
      </div>
    </section>
  );
};

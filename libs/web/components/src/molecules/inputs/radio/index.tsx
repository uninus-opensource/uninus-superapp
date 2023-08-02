import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TRadioButtonProps } from "./types";

import clsx from "clsx";

export const RadioButton = <T extends FieldValues>({
  variant = "primary",
  size = "sm",
  labelSize = "sm",
  ...props
}: TRadioButtonProps<T>): ReactElement => {
  const radioButtonSize = clsx("rounded-full p-2", {
    "w-3 h-3": size === "sm",
    "w-4 h-4": size === "md",
    "w-5 h-5": size === "lg",
  });

  const radioButtonVariant = clsx(
    "bg-grayscale-4 border-grayscale-8 duration-300 appearance-none",
    {
      "checked:bg-primary-green": variant === "primary",
      "accent-primary-yellow focus:accent--primary-yellow": variant === "warning",
    },
  );

  const lblSize = clsx("ml-2 font-medium text-primary-black", {
    "text-xs": labelSize === "sm",
    "text-sm": labelSize === "md",
    "text-lg": labelSize === "lg",
  });

  const className = `${radioButtonSize} ${radioButtonVariant}`;

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <section className="flex items-center gap-1 w-auto h-auto">
      <input
        type="radio"
        className={className}
        {...{ ...props, ...field }}
        id={props.id}
        value={props.value}
        name={props.name}
        checked={props.isChecked}
        onChange={props.onChange}
      />
      <label htmlFor={props.name} className={lblSize}>
        {props.label}
        {props.required && <span className="ml-1 font-bold text-primary-green">*</span>}
      </label>
    </section>
  );
};

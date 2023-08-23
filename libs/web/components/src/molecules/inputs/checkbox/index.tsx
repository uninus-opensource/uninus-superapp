import { ReactElement } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TCheckBoxProps } from "./type";
import { CHECKBOX_SIZE, CHECKBOX_VARIANT, LABEL_SIZE } from "./enum";
import clsx from "clsx";

export const CheckBox = <T extends FieldValues>({
  variant = CHECKBOX_VARIANT.PRIMARY,
  size = CHECKBOX_SIZE.SM,
  labelSize = LABEL_SIZE.SM,

  ...props
}: TCheckBoxProps<T>): ReactElement => {
  const checkboxSize = clsx("p-2", {
    "w-3 h-3": size === CHECKBOX_SIZE.SM,
    "w-4 h-4": size === CHECKBOX_SIZE.MD,
    "w-5 h-5": size === CHECKBOX_SIZE.LG,
  });

  const checkboxVariant = clsx(
    "bg-gray-300 border-gray-300 checked:scale-110 checked:bg-primary-green duration-300 rounded-full",
    {
      "accent-primary-green focus:accent-sexondary-green-2 checked:bg-primary-green rounded-full text-primary-green focus:ring-0 ring-0 ring-primary-white":
        variant === CHECKBOX_VARIANT.PRIMARY,
      "accent-red-300 focus:accent-red-400": variant === CHECKBOX_VARIANT.ERROR,
      "accent-yellow-300 focus:accent-yellow-400": variant === CHECKBOX_VARIANT.WARNING,
    },
  );

  const lblSize = clsx("ml-2 text-primary-black", {
    "text-xs font-normal": labelSize === LABEL_SIZE.SM,
    "text-sm font-medium": labelSize === LABEL_SIZE.MD,
    "text-lg font-extramedium": labelSize === LABEL_SIZE.LG,
  });

  const className = `${checkboxSize} ${checkboxVariant} checked:bg-primary-green`;

  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <section className="flex items-center gap-1">
      <input
        id={props.name}
        role="checkbox"
        type="checkbox"
        className={className}
        {...{ ...props, ...field }}
        onClick={props.onClick}
        disabled={props.disabled}
      />
      <label htmlFor={props.name} className={lblSize}>
        {props.label}
      </label>
    </section>
  );
};

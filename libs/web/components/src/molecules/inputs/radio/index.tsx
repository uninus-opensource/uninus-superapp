import { ChangeEvent, ReactElement, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TRadioButtonProps } from "./types";

import clsx from "clsx";

export const RadioButton = <T extends FieldValues>({
  variant = "primary",
  size = "sm",
  labelSize = "sm",
  ...props
}: TRadioButtonProps<T>): ReactElement => {
  const [value, setValue] = useState<string>("");

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
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    console.log(e.target.value);
  };
  const { field } = useController({
    ...props,
    rules: {
      required: props.required,
    },
  });

  return (
    <section className="flex flex-col gap-y-2 xl:gap-y-2">
      <h3 className="text-xs font-semibold">
        {props.fieldName} <span className="ml-1 font-bold text-primary-green">*</span>
      </h3>
      <div className="flex items-center gap-x-4 xl:gap-x-8 mt-1 xl:ml-0 xl:self-start xl:w-[25vw] place-self-start">
        {props.options?.map((item, idx) => (
          <div>
            <input
              type="radio"
              className={className}
              {...{ ...props, ...field }}
              id={`${item.value}-${idx}`}
              key={idx}
              value={item.value}
              name={props.name}
              checked={item.value === value}
              onChange={handleOnChange}
            />
            <label htmlFor={props.name} className={lblSize}>
              {item.name}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
};

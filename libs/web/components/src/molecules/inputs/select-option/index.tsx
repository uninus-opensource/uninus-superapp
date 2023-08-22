import { ReactElement, FC, forwardRef, Ref } from "react";
import { useController } from "react-hook-form";
import { SelectInputProps, TSelectOption } from "./types";
import Select, { MultiValue, SingleValue } from "react-select";

export const SelectOption: FC<SelectInputProps> = forwardRef(
  (
    {
      control,
      name,
      className,
      labelName,
      labels,
      disabled,
      labelClassName,
      options,
      placeholder,
      required = true,
      isSearchable,
      isClearable,
      isMulti,
      message,
      ...rest
    }: SelectInputProps,
    ref?: Ref<any> | undefined,
  ): ReactElement => {
    const {
      field: { value, onChange },
      fieldState: { invalid, error },
    } = useController({
      name,
      control,
      defaultValue: "",
      ...rest,
      rules: {
        required: required,
      },
    });

    const handleChange = (payload: MultiValue<TSelectOption> | SingleValue<TSelectOption>) => {
      const pay = payload as TSelectOption;
      onChange(pay?.value);
    };

    return (
      <div className="flex flex-col">
        <label className={labelClassName}>
          {labels} {required && <span className="ml-1 font-bold text-primary-green">*</span>}
        </label>
        <Select
          options={options}
          isDisabled={disabled}
          className={className}
          isSearchable={isSearchable}
          placeholder={placeholder}
          isClearable={isClearable}
          isMulti={isMulti}
          value={options.find((option) => option.value === value)}
          onChange={handleChange}
          ref={ref}
        />
        {invalid && <span className="text-red-5 text-xs pt-1">{`${message}`}</span>}
      </div>
    );
  },
);

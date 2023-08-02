import { ReactElement, FC } from 'react';
import Select from 'react-select';
import { useController } from 'react-hook-form';
import { SelectInputProps } from './types';

export const SelectOption: FC<SelectInputProps> = ({
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
  ...rest
}: SelectInputProps): ReactElement => {
  const {
    field: { value, ref, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: '',
    ...rest,
  });

  const handleChange = (value: any) => {
    onChange(value?.value);
  };

  return (
    <div className="flex flex-col">
      <label className={`font-bold text-xs py-2 ${labelClassName}`}>
        {labels}{' '}
        {required && (
          <span className="ml-1 font-bold text-primary-green">*</span>
        )}
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
      {invalid && <span>{error?.message}</span>}
    </div>
  );
};

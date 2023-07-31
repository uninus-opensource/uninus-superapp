import { ReactElement, FC, useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useController } from 'react-hook-form';
import { SelectInputProps } from './types';
import observeElement, {
  IntersectionCallback,
} from './intersectionObserverUtils';

export const SelectOption: FC<SelectInputProps> = ({
  control,
  name,
  className,
  labelName,
  labels,
  labelClassName,
  options,
  placeholder,
  isSearchable = true,
  isClearable = true,
  isMulti = true,
  ...rest
}: SelectInputProps): ReactElement => {
  const {
    field: { value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: '',
    ...rest,
  });

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (value: any) => {
    setSelectedOption(value);
  };

  const [isInViewPort, setIsInViewPort] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current) {
      const callback: IntersectionCallback = (isInViewPort: boolean) => {
        setIsInViewPort(isInViewPort);
      };

      observeElement(selectRef.current, callback);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <label className="font-bold text-sm" htmlFor={labelName}>
        {labels}
      </label>
      <Select
        options={options}
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

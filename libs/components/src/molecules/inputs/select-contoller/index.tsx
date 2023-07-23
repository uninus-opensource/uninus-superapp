import React, { useRef, useEffect } from 'react';
import Select from 'react-select';

interface Option {
  label: string;
  value: string;
  children?: Option[];
}

interface NestedSelectOptionProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
}

const NestedSelectOption: React.FC<NestedSelectOptionProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isMulti={false}
      // Add other necessary props for the Select component here
    />
  );
};

export default NestedSelectOption;

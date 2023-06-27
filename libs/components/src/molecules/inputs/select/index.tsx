import { FC, ReactElement } from 'react';
import { TSelectType } from './types';
import clsx from 'clsx';

export const SelectField: FC<TSelectType> = (props): ReactElement => {
  const selectClassName = clsx(
    'border rounded-md outline-none ml-1',
    {
      'border-slate-300 bg-slate-100': props.status === 'none',
      'border-green-300 bg-green-100': props.status === 'success',
      'border-red-300 bg-red-100': props.status === 'error',
    },
    { 'p-1': props.size === 'sm', 'p-2': props.size === 'md' }
  );

  const labelClassName = clsx({
    'text-green-400': props.status === 'success',
    'text-red-400': props.status === 'error',
  });

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <label htmlFor={props.name} className={labelClassName}>
        {props.label}
      </label>
      <select name={props.name} className={selectClassName} defaultValue="">
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {props.message && <span className={labelClassName}>{props.message}</span>}
    </div>
  );
};

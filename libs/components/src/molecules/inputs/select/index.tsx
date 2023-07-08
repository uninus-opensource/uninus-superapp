import { FC, ReactElement } from 'react';
import { TSelectType } from './types';
import clsx from 'clsx';
import { AiFillWarning } from 'react-icons/ai';
import { BiSolidErrorCircle } from 'react-icons/bi';
import { AiFillCheckCircle } from 'react-icons/ai';

export const SelectField: FC<TSelectType> = (props): ReactElement => {
  const selectClassName = clsx(
    'border rounded-md outline-none ml-1',
    {
      'border-green-300 bg-green-100': props.status === 'success',
      'border-amber-300 bg-amber-100': props.status === 'warning',
      'border-red-300 bg-red-100': props.status === 'error',
      'border-slate-300 bg-slate-100': props.status === 'none',
    },
    {
      'p-1 text-sm': props.size === 'sm',
      'p-2 text-md': props.size === 'md',
    }
  );

  const labelClassName = clsx('ml-2', {
    'text-sm': props.size === 'sm',
    'text-md': props.size === 'md',
  });

  const messageClassName = clsx(
    'ml-2',
    {
      'text-green-400': props.status === 'success',
      'text-amber-300': props.status === 'warning',
      'text-red-400': props.status === 'error',
      'text-slate-400': props.status === 'none',
    },
    {
      'text-sm': props.size === 'sm',
      'text-md': props.size === 'md',
    }
  );

  return (
    <div className="flex flex-col gap-1">
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
      {props.message && (
        <span className={messageClassName}>
          {props.status === 'error' && (
            <BiSolidErrorCircle className="inline-block mr-1 text-red-400" />
          )}
          {props.status === 'warning' && (
            <AiFillWarning className="inline-block mr-1 text-amber-300" />
          )}
          {props.status === 'success' && (
            <AiFillCheckCircle className="inline-block mr-1 text-green-400" />
          )}
          {props.message}
        </span>
      )}
    </div>
  );
};

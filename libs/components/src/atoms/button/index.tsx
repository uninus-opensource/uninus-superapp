import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { IButtonProps } from './interface';
import Link from 'next/link';
import { LoadingSpinner } from '../loadings';

export const Button: FC<IButtonProps> = ({
  loading = false,
  size = 'sm',
  variant = 'filled',
  width = 'w-22',
  height = 'h-11',
  uppercase = false,
  styling = '',
  ...props
}): ReactElement => {
  const buttonSize = clsx(
    `text-center text-base  ${width} ${height} ${
      uppercase ? 'uppercase' : ''
    } ${styling} `,
    {
      'p-4': size === 'sm',
      'p-5': size === 'md',
      'p-6': size === 'lg',
    }
  );

  const buttonVariant = clsx(
    'font-medium flex items-center justify-center duration-200 rounded-lg',
    {
      'bg-primary-green text-primary-white shadow-sm shadow-grayscale-6 disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-none active:scale-95 ':
        variant === 'elevated',
      'bg-primary-green text-primary-white disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-inset ':
        variant === 'filled',
      'bg-secondary-green-4 text-primary-white disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-green-5 focus:bg-secondary-green-5 active:shadow-inset ':
        variant === 'filled-tonal',
      'text-secondary-green-4 border-2 border-secondary-green-4':
        variant === 'outlined',
      'text-sceondary-green-4 disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-sky-1 focus:bg-secondary-sky-2 active:bg-secondary-sky-2 ':
        variant === 'text-icon',
      'fixed bottom-4 right-4 bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5  ':
        variant === 'float-bottom-right',
      'disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed active:shadow-inset ':
        variant === 'custom',
      'text-white uppercase bg-none hover:bg-green-800 font-semibold hover:opacity-100 w-full ':
        variant === 'sidebarlist',
    }
  );

  const className = [...buttonVariant, ...buttonSize].join('');

  return props?.href ? (
    <Link role="link" href={`${props?.href}`}>
      <button {...props} className={className}>
        {loading ? <LoadingSpinner /> : props.children}
      </button>
    </Link>
  ) : (
    <button {...props} className={className}>
      {loading ? <LoadingSpinner /> : props.children}
    </button>
  );
};

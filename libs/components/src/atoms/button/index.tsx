import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { IButtonProps } from './interface';
import { BUTTON_SIZE, BUTTON_VARIANT } from './enums';
import Link from 'next/link';
import { LoadingSpinner } from '../loadings';

export const Button: FC<IButtonProps> = ({
  loading = false,
  size = BUTTON_SIZE.SM,
  variant = BUTTON_VARIANT.PRIMARY,
  width = 'w-auto',
  height = 'h-auto',
  ...props
}): ReactElement => {
  const buttonSize = clsx(`text-center  ${width} ${height} `, {
    'p-2 text-sm': size === BUTTON_SIZE.SM,
    'p-5 text-md': size === BUTTON_SIZE.MD,
    'p-6 text-lg': size === BUTTON_SIZE.LG,
  });

  const buttonVariant = clsx(
    'font-medium disabled:bg-gray-400 disabled:text-gray-50 disabled:border-gray-400 flex items-center justify-center duration-200',
    {
      'bg-green-500 text-white border border-green-500 rounded-lg hover:opacity-75 ':
        variant === BUTTON_VARIANT.PRIMARY,
      'bg-white text-green-500 border border-green-500 rounded-lg hover:opacity-75 ':
        variant === BUTTON_VARIANT.PRIMARY_OUTLINE,
      'bg-red-500 text-white border border-red-500 rounded-lg hover:opacity-75 ':
        variant === BUTTON_VARIANT.ERROR,
      'bg-white text-red-600 border border-red-600 rounded-lg hover:opacity-75 ':
        variant === BUTTON_VARIANT.ERROR_OUTLINE,
      'bg-yellow-500 text-white border border-yellow-500 rounded-lg hover:opacity-75 ':
        variant === BUTTON_VARIANT.WARNING,
      'bg-white text-yellow-600 border border-yellow-600 rounded-lg hover:opacity-75 ':
        variant === BUTTON_VARIANT.WARNING_OUTLINE,
      'text-white uppercase bg-none border-b border-green-930 hover:border-white rounded-none hover:opacity-100 ':
        variant === BUTTON_VARIANT.NAVLIST,
      'rounded-lg hover:bg-green-800 ': variant === BUTTON_VARIANT.HAMBURGER,

      'text-white uppercase bg-none hover:bg-green-800 rounded-none hover:opacity-100 w-full ':
        variant === BUTTON_VARIANT.SIDEBARLIST,
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

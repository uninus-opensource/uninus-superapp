import clsx from 'clsx';
import { FC, ReactElement } from 'react';
import { IButtonProps } from './interface';
import { BUTTON_SIZE, BUTTON_VARIANT } from './enums';
import Link from 'next/link';
import { LoadingSpinner } from '../loadings';

export const Button: FC<IButtonProps> = ({
  loading = false,
  size = BUTTON_SIZE.SM,
  variant = BUTTON_VARIANT.FILLED,
  width = 'w-22',
  height = 'h-11',
  ...props
}): ReactElement => {
  const buttonSize = clsx(`text-center text-base  ${width} ${height} `, {
    'p-4': size === BUTTON_SIZE.SM,
    'p-5': size === BUTTON_SIZE.MD,
    'p-6': size === BUTTON_SIZE.LG,
  });

  const buttonVariant = clsx(
    'font-medium flex items-center justify-center duration-200 rounded-lg',
    {
      'bg-primary-green text-primary-white shadow-sm shadow-grayscale-6 disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-none active:scale-95 ':
        variant === BUTTON_VARIANT.ELEVATED,
      'bg-primary-green text-primary-white disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-inset ':
        variant === BUTTON_VARIANT.FILLED,
      'bg-secondary-green-4 text-primary-white disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-green-5 focus:bg-secondary-green-5 active:shadow-inset ':
        variant === BUTTON_VARIANT.FILLED_TONAL,
      'text-secondary-green-4 border-2 border-secondary-green-4':
        variant === BUTTON_VARIANT.OUTLINED,
      'text-sceondary-green-4 disabled:text-grayscale-4 disabled:cursor-not-allowed hover:bg-secondary-sky-1 focus:bg-secondary-sky-2 active:bg-secondary-sky-2 ':
        variant === BUTTON_VARIANT.TEXT_ICON,
      'fixed bottom-4 right-4 bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5  ':
        variant === BUTTON_VARIANT.FLOAT_BOTTOM_RIGHT,
      'text-white uppercase bg-none border-b border-green-930 hover:border-white font-semibold hover:opacity-100 ':
        variant === BUTTON_VARIANT.NAVLIST,
      'hover:bg-green-800 ': variant === BUTTON_VARIANT.HAMBURGER,

      'text-white uppercase bg-none hover:bg-green-800 font-semibold hover:opacity-100 w-full ':
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

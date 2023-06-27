import clsx from 'clsx';
import { FC, Fragment, ReactElement } from 'react';
import { IButtonProps } from './interface';
import { BUTTON_SIZE, BUTTON_VARIANT } from './enums';
import Link from 'next/link';
import { LoadingSpinner } from '../loadings';

export const Button: FC<IButtonProps> = ({
  loading = false,
  size = BUTTON_SIZE.SM,
  variant = BUTTON_VARIANT.PRIMARY,
  ...props
}): ReactElement => {
  const buttonSize = clsx('w-full text-center hover:opacity-75', {
    'p-2 h-10 text-sm': size === BUTTON_SIZE.SM,
    'p-4 h-14 text-md': size === BUTTON_SIZE.MD,
    'p-6 h-18 text-lg': size === BUTTON_SIZE.LG,
  });

  const buttonVariant = clsx(
    'rounded-lg font-medium disabled:bg-gray-400 disabled:text-gray-50 disabled:border-gray-400 appearance-none',
    {
      'bg-green-500 text-white border border-green-500 ':
        variant === BUTTON_VARIANT.PRIMARY,
      'bg-white text-green-500 border border-green-500 ':
        variant === BUTTON_VARIANT.PRIMARY_OUTLINE,
      'bg-red-600 text-white border border-red-600 ':
        variant === BUTTON_VARIANT.ERROR,
      'bg-white text-red-600 border border-red-600 ':
        variant === BUTTON_VARIANT.ERROR_OUTLINE,
      'bg-yellow-600 text-white border border-yellow-600 ':
        variant === BUTTON_VARIANT.WARNING,
      'bg-white text-yellow-600 border border-yellow-600 ':
        variant === BUTTON_VARIANT.WARNING_OUTLINE,
    }
  );

  const className = [...buttonVariant, ...buttonSize].join('');

  return (
    <Fragment>
      {props?.href ? (
        <Link role="link" href={`${props?.href}`}>
          <button role="button" {...props} className={className}>
            {loading ? <LoadingSpinner /> : props.children}
          </button>
        </Link>
      ) : (
        <button role="button" {...props} className={className}>
          {loading ? <LoadingSpinner /> : props.children}
        </button>
      )}
    </Fragment>
  );
};

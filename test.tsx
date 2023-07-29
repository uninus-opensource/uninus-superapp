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
  const scroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  let buttonSize = `${styling} text-sm ${width} ${height} ${
    uppercase ? 'uppercase' : ''
  }`;
  if (size === 'sm') {
    buttonSize += ' p-4';
  } else if (size === 'md') {
    buttonSize += ' p-5';
  } else if (size === 'lg') {
    buttonSize += ' p-6';
  }

  let buttonVariant = 'font-black flex items-center justify-center duration-200 rounded-lg disabled:bg-disable-state disabled:text-grayscale-4 disabled:cursor-not-allowed';
  if (variant === 'elevated') {
    buttonVariant += ' bg-primary-green text-primary-white shadow-sm shadow-grayscale-6 hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-none active:scale-95';
  } else if (variant === 'filled') {
    buttonVariant += ' bg-primary-green text-primary-white hover:bg-secondary-green-1 focus:bg-secondary-green-1 active:shadow-inset';
  } else if (variant === 'filled-tonal') {
    buttonVariant += ' bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5 active:shadow-inset';
  } else if (variant === 'outlined') {
    buttonVariant += ' text-primary-white border-2 border-secondary-green-4';
  } else if (variant === 'text-icon') {
    buttonVariant += ' text-sceondary-green-4 hover:bg-secondary-sky-1 active:bg-secondary-sky-2';
  } else if (variant === 'float-bottom-right') {
    buttonVariant += ' fixed bottom-4 right-4 bg-secondary-green-4 text-primary-white hover:bg-secondary-green-5 focus:bg-secondary-green-5';
  } else if (variant === 'custom') {
    buttonVariant += ' active:shadow-inset';
  } else if (variant === 'sidebarlist') {
    buttonVariant += ' text-white uppercase bg-none hover:bg-green-800 font-semibold hover:opacity-100 w-full';
  } else if (variant === 'sidebarbutton') {
    buttonVariant += ' text-primary-green font-normal';
  } else if (variant === 'green-outline') {
    buttonVariant += ' bg-primary-white text-primary-green border border-primary-green active:shadow-inset';
  }

  const className = `${buttonVariant} ${buttonSize}`;

  return props?.href ? (
    <Link role="link" href={`${props?.href}`} onClick={scroll}>
      <button
        {...props}
        className={`${className} ${loading ? 'hover:cursor-wait' : ''}`}
      >
        {loading ? <LoadingSpinner className="w-5 h-5" /> : props.children}
      </button>
    </Link>
  ) : (
    <button
      {...props}
      className={`${className} ${loading ? 'hover:cursor-wait' : ''}`}
    >
      {loading ? <LoadingSpinner className="w-5 h-5" /> : props.children}
    </button>
  );
};

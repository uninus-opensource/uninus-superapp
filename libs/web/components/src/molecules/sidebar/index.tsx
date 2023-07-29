'use client';
import { FC, ReactElement } from 'react';
import { TSidebarProps } from './type';

export const Sidebar: FC<TSidebarProps> = ({
  showSidebar,
  ...props
}): ReactElement => {
  return (
    <section
      className={`w-full h-full bg-primary-green text-primary-white z-40 fixed top-20 transition-transform py-7 px-5  ${
        showSidebar ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <nav className="text-primary-white">{props.children}</nav>
    </section>
  );
};

'use client';
import { FC, ReactElement } from 'react';
import { Button, XIcon } from '../../atoms';
import { TSidebarProps } from './type';

export const Sidebar: FC<TSidebarProps> = ({
  showSidebar,
  closeSidebar,
  ...props
}): ReactElement => {
  return (
    <div
      className={`flex justify-end w-full bg-gray-800 bg-opacity-40 h-full fixed z-50  ${
        showSidebar ? 'translate-x-0' : 'translate-x-full'
      } lg:hidden`}
    >
      <section
        className={`w-[70vw] h-full bg-green-930 fixed z-50 delay-100 transition-transform py-7 px-5  ${
          showSidebar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Button variant="hamburger" size="sm" onClick={closeSidebar}>
          <XIcon />
        </Button>
        <nav>{props.children}</nav>
      </section>
    </div>
  );
};

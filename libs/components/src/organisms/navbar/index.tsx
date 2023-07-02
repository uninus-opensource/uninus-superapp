'use client';
import { FC, ReactElement, Fragment, useState } from 'react';
import Image from 'next/image';
import NeoUninusIcon from '../../atoms/illustrations/neouninus/Neo-Uninus.png';
import { NavbarList } from './type';
import { Button, HamburgerIcon } from '../../atoms';
import { Sidebar } from '../../molecules';

export const Navbar: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const navList: NavbarList[] = [
    {
      item: 'home',
      link: '/',
    },
    {
      item: 'about',
      link: '/about',
    },
    {
      item: 'biaya kuliah',
      link: '/tuition-fee',
    },
  ];

  return (
    <Fragment>
      <header className="px-5 z-50 lg:px-14 flex justify-between items-center h-[17vh] sm:h-[15vh] lg:h-[12vh] w-full bg-green-930 fixed">
        <figure>
          <Image
            src={NeoUninusIcon}
            alt="logo-uninus"
            priority
            className="w-44 sm:w-56 lg:w-52"
          />
        </figure>
        <nav>
          {/* Desktop */}
          <div className="hidden lg:block">
            <ul className="flex gap-4">
              {navList.map((nav, idx) => (
                <li key={idx}>
                  <Button variant="nav" height="h-8" href={nav.link}>
                    {nav.item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          {/* Mobile */}
          <div className="block lg:hidden">
            <Button variant="hamburger" onClick={toggle}>
              <HamburgerIcon
                className={`fill-slate-100 duration-200 ${
                  isOpen ? 'rotate-90' : ''
                }`}
              />
            </Button>
          </div>
        </nav>
      </header>
      <Sidebar showSidebar={isOpen} closeSidebar={closeSidebar}>
        <ul className="mt-6 flex flex-col gap-6">
          {navList.map((nav, idx) => (
            <li key={idx}>
              <Button
                variant="sidebarlist"
                height="h-8"
                href={nav.link}
                onClick={closeSidebar}
              >
                {nav.item}
              </Button>
            </li>
          ))}
        </ul>
      </Sidebar>
    </Fragment>
  );
};

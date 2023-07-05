'use client';
import { FC, ReactElement, Fragment, useState } from 'react';
import Image from 'next/image';
import NeoUninusIcon from '../../atoms/illustrations/neouninus/Neo-Uninus.png';
import { NavbarList } from './type';
import { Button } from '../../atoms';
import { Sidebar } from '../../molecules';

export const Navbar: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const navList: NavbarList[] = [
    {
      item: 'home',
      link: '/',
    },
    {
      item: 'beasiswa',
      link: '/beasiswa',
    },
    {
      item: 'biaya kuliah',
      link: '/tuition-fee',
    },
  ];

  return (
    <Fragment>
      <header className="z-50 lg:px-14 flex justify-between items-center lg:h-navbarlg text-grayscale-1 w-full font-normal bg-primary-green sticky top-0 leading-normal">
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
                  <Button
                    variant="text-icon"
                    styling="font-bebasNeue font-semibold text-sm"
                    href={nav.link}
                    uppercase
                  >
                    {nav.item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <Button
          variant="custom"
          styling="bg-grayscale-1 text-secondary-green-4 font-semibold"
          height="h-9"
        >
          Pendaftaran PMB
        </Button>
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

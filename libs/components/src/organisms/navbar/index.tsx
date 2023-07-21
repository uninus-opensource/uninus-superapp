'use client';
import { FC, ReactElement, Fragment, useState } from 'react';
import Image from 'next/image';
import NeoUninusIcon from '../../atoms/illustrations/neouninus/Neo-Uninus.png';
import { NavbarList } from './type';
import { Button, HamburgerIcon, XIcon } from '../../atoms';
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
      item: 'beranda',
      link: '/',
    },
    {
      item: 'beasiswa',
      link: '/beasiswa',
    },
    {
      item: 'biaya kuliah',
      link: '/biaya-kuliah',
    },
  ];

  return (
    <Fragment>
      <header className="z-50 px-8 lg:px-14 flex justify-between items-center h-[100px] lg:h-navbarlg text-grayscale-1 w-full bg-primary-green fixed top-0 leading-normal font-bold">
        <figure>
          <Image
            src={NeoUninusIcon}
            alt="logo-uninus"
            priority
            className="w-44 sm:w-56 lg:w-52"
            quality={100}
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
                    styling="text-sm"
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
        <section className="flex items-center">
          <div className="hidden lg:block rounded-xl">
            <Button
              href="/auth/register"
              variant="custom"
              styling="bg-grayscale-1 text-secondary-green-4"
              height="h-9"
            >
              Pendaftaran PMB
            </Button>
          </div>
          <div className="block lg:hidden">
            <Button variant="text-icon" onClick={toggle}>
              {isOpen ? (
                <XIcon />
              ) : (
                <HamburgerIcon className={`fill-primary-white duration-200`} />
              )}
            </Button>
          </div>
        </section>
      </header>
      <Sidebar showSidebar={isOpen} closeSidebar={closeSidebar}>
        <ul className="mt-6 flex flex-col gap-6 items-center">
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
          <div className="w-[50vw]">
            <Button
              variant="sidebarlist"
              height="h-8"
              href="/auth/register"
              onClick={closeSidebar}
              styling="bg-primary-white text-primary-green rounded-md"
              size="sm"
            >
              PENDAFTARAN PMB
            </Button>
          </div>
        </ul>
      </Sidebar>
    </Fragment>
  );
};

'use client';
import { FC, ReactElement, useState } from 'react';
import Image from 'next/image';
import NeoUninusIcon from '../../atoms/illustrations/neouninus/Neo-Uninus.png';
import { NavbarList } from './type';
import { Button, HamburgerIcon } from '../../atoms';
import { motion } from 'framer-motion';

export const Navbar: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const navList: NavbarList[] = [
    {
      item: 'home',
      link: 'https://uninus.ac.id/',
    },
    {
      item: 'about',
      link: 'https://www.google.com/',
    },
    {
      item: 'contact',
      link: 'https://github.com/',
    },
  ];

  return (
    <header className="px-5 lg:px-14 flex justify-between items-center h-[17vh] sm:h-[15vh] lg:h-[12vh] w-full bg-[#1c532a] fixed">
      <motion.figure
        style={{
          y: -200,
        }}
        animate={{
          y: [-200, 0],
        }}
      >
        <Image
          src={NeoUninusIcon}
          alt="logo-uninus"
          priority
          className="w-44 sm:w-56 lg:w-52"
        />
      </motion.figure>
      <motion.nav
        style={{
          y: -200,
        }}
        animate={{
          y: [-200, 0],
        }}
      >
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
            <HamburgerIcon className="fill-slate-100 " />
          </Button>
        </div>
      </motion.nav>
    </header>
  );
};

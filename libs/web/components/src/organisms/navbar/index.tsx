"use client";
import { FC, ReactElement, Fragment, useState } from "react";
import Image from "next/image";
import { NavbarList } from "./type";
import { Button, HamburgerIcon, XIcon } from "../../atoms";
import { Sidebar } from "../../molecules";
import { AiOutlineDown } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";

export const Navbar: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const navList: NavbarList[] = [
    {
      item: "Beranda",
      link: "/",
    },
    {
      item: (
        <Fragment>
          Program{" "}
          <AiOutlineDown
            className={`ml-1 h-4 text-xl duration-100 ${isDropDown ? "rotate-180" : ""}`}
          />
        </Fragment>
      ),
      state: () => {
        setIsDropDown(true);
      },
      state2: () => {
        setIsDropDown(false);
      },
    },
    {
      item: "Beasiswa",
      link: "/beasiswa",
    },
  ];

  return (
    <Fragment>
      <header
        data-testid="navbarLanding"
        className="z-40 px-8 lg:px-14 flex justify-between items-center h-[100px] lg:h-navbarlg text-grayscale-1 w-full bg-primary-green fixed top-0 leading-normal font-bold"
      >
        <figure>
          <Image
            src={"/illustrations/Neo-Uninus.webp"}
            width={500}
            height={500}
            quality={100}
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
                    variant="navlist"
                    href={nav.link}
                    onMouseEnter={nav.state}
                    onMouseLeave={nav.state2}
                    uppercase
                  >
                    {nav.item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* dropdown bar */}
          {isDropDown && (
            <motion.nav
              style={{
                y: -10,
              }}
              animate={{
                y: isDropDown ? [-10, 0] : [0, -10],
              }}
              className="hidden lg:flex absolute w-36 h-32 z-50  text-base text-primary-black items-center justify-center flex-col rounded-sm ml-28 -mt-2"
              onMouseEnter={navList[1]?.state}
              onMouseLeave={navList[1]?.state2}
            >
              <div className="bg-primary-green w-full h-full"></div>

              <Link
                className="flex items-center justify-center p-2 bg-primary-white text-primary-green hover:text-primary-white hover:bg-secondary-green-1 active:bg-secondary-green-4 duration-150 border-2 border-l-0 border-primary-green w-full h-full "
                href="/program-studi"
              >
                Program Studi
              </Link>
              <Link
                className="flex items-center justify-center p-2 bg-primary-white text-primary-green hover:text-primary-white hover:bg-secondary-green-1 active:bg-secondary-green-4 border-2 border-t-0 border-l-0 border-b-0 border-primary-green w-full h-full shadow-md"
                href="/biaya-kuliah"
              >
                Biaya Kuliah
              </Link>
            </motion.nav>
          )}
        </nav>

        <section className="flex items-center">
          <div className="hidden lg:block rounded-xl">
            <Button
              href="/auth/login"
              variant="custom"
              styling="bg-grayscale-1 text-secondary-green-4"
              width="w-26"
              height="h-9"
            >
              Login
            </Button>
          </div>
          <div className="block lg:hidden">
            <Button variant="text-icon" onClick={toggle}>
              {isOpen ? <XIcon /> : <HamburgerIcon className={`fill-primary-white duration-200`} />}
            </Button>
          </div>
        </section>
      </header>

      <Sidebar showSidebar={isOpen} closeSidebar={closeSidebar}>
        <ul className="mt-6 flex flex-col gap-6 items-center">
          {navList.map((nav, idx) => (
            <li key={idx}>
              <Button variant="sidebarlist" height="h-8" href={nav.link} onClick={closeSidebar}>
                {nav.item}
              </Button>
            </li>
          ))}
          <div className="w-[50vw]">
            <Button
              variant="sidebarlist"
              height="h-8"
              href="/auth/login"
              onClick={closeSidebar}
              styling="bg-primary-white text-primary-green rounded-md text-xs font-bold"
              size="sm"
            >
              Login
            </Button>
          </div>
        </ul>
      </Sidebar>
    </Fragment>
  );
};

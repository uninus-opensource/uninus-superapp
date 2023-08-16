"use client";
import { FC, ReactElement, Fragment, useState } from "react";
import Image from "next/image";
import { TDropDownList, TNavbarList } from "./type";
import { Button, HamburgerIcon } from "../../atoms";
import { Sidebar } from "../../molecules";
import { CaretDownOutlined } from "@ant-design/icons";
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

  const navList: TNavbarList[] = [
    {
      item: "Beranda",
      link: "/",
    },
    {
      item: (
        <div className="flex justify-between w-full">
          Program{" "}
          <CaretDownOutlined
            style={{
              fontSize: "20px",
              marginLeft: "6px",
              transitionDuration: "100ms",
            }}
            rotate={isDropDown ? 180 : 0}
          />
        </div>
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

  const dropDown: TDropDownList[] = [
    {
      item: "Program Studi",
      link: "/program-studi",
    },
    {
      item: "Biaya Kuliah",
      link: "/biaya-kuliah",
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
          <div className="hidden lg:block" data-testid="navDesktop">
            <ul className="flex gap-4">
              {navList.map((nav, idx) => (
                <li key={idx}>
                  <Button
                    variant="navlist"
                    styling="text-lg"
                    href={nav.link}
                    onMouseEnter={nav.state}
                    onMouseLeave={nav.state2}
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
              className="hidden lg:flex absolute w-36 h-28 z-50 text-base text-primary-black items-center justify-center flex-col rounded-sm ml-[5.7rem] bg-primary-green"
              onMouseEnter={navList[1]?.state}
              onMouseLeave={navList[1]?.state2}
            >
              {dropDown.map((drop, idx) => (
                <Link
                  key={idx}
                  className="flex items-center justify-center p-2 text-primary-white hover:bg-secondary-green-1 active:bg-secondary-green-4 duration-150 border-primary-green w-full h-full "
                  href={drop.link}
                >
                  {drop.item}
                </Link>
              ))}
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
              {<HamburgerIcon className={`fill-primary-white duration-200`} />}
            </Button>
          </div>
        </section>
      </header>

      <Sidebar showSidebar={isOpen} closeSidebar={closeSidebar}>
        <ul className="flex flex-col gap-6 text-left">
          <li>
            <Button
              variant="sidebarlist"
              width="w-full"
              styling="text-xl"
              href="/"
              onClick={closeSidebar}
            >
              Beranda
            </Button>
          </li>
          <li>
            <Button
              variant="sidebarlist"
              width="w-full"
              styling="text-xl"
              onClick={() => setIsDropDown(!isDropDown)}
            >
              Program{" "}
              <CaretDownOutlined className={`duration-100 ${isDropDown ? "rotate-180" : ""}`} />
            </Button>
          </li>
          {isDropDown &&
            dropDown.map((nav, idx) => (
              <li key={idx} className="px-5">
                <Button variant="navlist" styling="text-xl" href={nav.link}>
                  {nav.item}
                </Button>
              </li>
            ))}
          <li>
            <Button
              variant="sidebarlist"
              width="w-full"
              styling="text-xl"
              href="/beasiswa"
              onClick={closeSidebar}
            >
              Beasiswa
            </Button>
          </li>
          <li className="w-full mt-10">
            <Button
              href="/auth/login"
              variant="custom"
              size="lg"
              styling="bg-grayscale-1 text-secondary-green-4 text-xl"
              width="w-full"
              height="h-10"
            >
              Login
            </Button>
          </li>
        </ul>
      </Sidebar>
    </Fragment>
  );
};

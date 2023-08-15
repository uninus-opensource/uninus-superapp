"use client";
import { FC, ReactElement } from "react";
import { TSidebarProps } from "./type";
import Image from "next/image";
import { Button, XIcon } from "../../atoms";

export const Sidebar: FC<TSidebarProps> = ({ showSidebar, ...props }): ReactElement => {
  return (
    <main
      data-testid="bg-sidebar-navbar"
      className={`${
        showSidebar ? "-translate-x-0 lg:-translate-x-full" : "-translate-x-full"
      } fixed w-screen h-screen bg-primary-black bg-opacity-75 z-[9999]`}
    >
      <section
        data-testid="sidebar-navbar"
        className={`w-[80vw] sm:w-[60vw] md:w-[50vw] h-full bg-primary-green text-primary-white z-40 fixed transition-transform px-5 py-6 ${
          showSidebar ? "-translate-x-0 lg:-translate-x-full" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center w-full justify-between">
          <Image
            src={"/illustrations/Neo-Uninus.webp"}
            width={500}
            height={500}
            quality={100}
            alt="logo-uninus"
            priority
            className="w-44 sm:w-56 lg:w-52"
          />
          <Button variant="text-icon" onClick={props.closeSidebar}>
            <XIcon />
          </Button>
        </div>
        <nav className="text-primary-white text-left my-16">{props.children}</nav>
      </section>
    </main>
  );
};

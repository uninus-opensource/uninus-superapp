import { FC, Fragment, ReactElement } from "react";
import { NusaVerseIcon } from "../../atoms";
import { TSidebarV2 } from "./types";
import Link from "next/link";
import { AiOutlineExclamationCircle, AiOutlineLogout } from "react-icons/ai";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSidebarSiakadToogle } from "@uninus/web/services";
export const SidebarV2: FC<TSidebarV2> = ({
  sideList,
  title = "Nama Modul",
  onLogout,
  showSideBar,
  onHoverOn,
  onHoverOff,
}): ReactElement => {
  const path = usePathname();
  const { getSiakadToogle } = useSidebarSiakadToogle();
  return (
    <Fragment>
      {/* Desktop */}
      <aside
        className={`lg:flex flex-col xl:gap-3 lg:gap-2 items-center justify-between h-screen hidden ${
          showSideBar ? "xl:w-[20%] lg:w-[25%] md:w-[30%]" : "lg:w-[7%]"
        } border-r border-slate-3 transition-all px-4 py-1 duration-500 ease-in-out overflow-y-hidden`}
        onMouseEnter={onHoverOn}
        onMouseLeave={onHoverOff}
      >
        {/* Header section */}
        <header className={`w-full flex items-center gap-5 ${showSideBar ? "" : "justify-center"}`}>
          <figure>
            <NusaVerseIcon className="xl:w-[4em] xl:h-[4em] lg:w-[2.5em] lg:h-[2.5em]" />
          </figure>

          <h1
            className={`xl:text-lg text-base font-bold ease-in-out absolute xl:left-[5.5em] lg:left-[5em] ${
              showSideBar ? "delay-100 duration-150" : "opacity-0 duration-0"
            }`}
          >
            {title}
          </h1>
        </header>

        {/* Sidebar list */}
        <section className="w-full flex flex-col gap-2 items-center ease-in mb-4">
          {sideList.map((item, index) => (
            <Link
              key={index}
              href={`${item.link}`}
              className={`${
                showSideBar ? "w-full" : "xl:w-[70%] lg:w-[85%] justify-center"
              } flex items-center text-center p-2.5 rounded-md duration-300 ease-in-out  ${
                item.link === path
                  ? "bg-primary-green"
                  : "hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green"
              }`}
            >
              <span
                className={`${
                  item.link === path
                    ? "text-primary-white"
                    : "text-primary-green group-active:text-primary-white group-focus:text-primary-white"
                }  xl:text-2xl lg:text-base`}
              >
                {item.icon}
              </span>
              <span
                className={`${showSideBar ? "delay-150" : "opacity-0"} ${
                  item.link === path
                    ? "text-primary-white"
                    : "text-primary-green group-active:text-primary-white group-focus:text-primary-white"
                }  absolute xl:left-[5em] lg:left-[4em] xl:text-base lg:text-sm`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </section>

        {/* Footer section */}
        <section className="w-full flex flex-col gap-2 items-center ease-in xl:mt-[3rem] lg:mt-[2rem] mb-8">
          <Link
            href={`#`}
            className={`${
              showSideBar ? "w-full" : "xl:w-[70%] lg:w-[85%] justify-center"
            } flex items-center text-center p-2.5 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-300 ease-in-out`}
          >
            <span className="text-2xl text-primary-green group-active:text-primary-white group-focus:text-primary-white xl:text-2xl lg:text-base">
              <AiOutlineExclamationCircle />
            </span>
            <span
              className={`${
                showSideBar ? "delay-150" : "opacity-0"
              } text-primary-green group-active:text-primary-white group-focus:text-primary-white absolute xl:left-[5em] left-[4em] xl:text-base lg:text-sm`}
            >
              Pusat Bantuan
            </span>
          </Link>
          <hr className="w-full" />
          <button
            onClick={onLogout}
            className={`${
              showSideBar ? "w-full" : "xl:w-[70%] lg:w-[85%] justify-center"
            } flex items-center text-center p-2.5 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-300 ease-in-out`}
          >
            <span className="text-2xl text-primary-green group-active:text-primary-white group-focus:text-primary-white xl:text-2xl lg:text-base">
              <AiOutlineLogout />
            </span>
            <span
              className={`${
                showSideBar ? "delay-150" : "opacity-0"
              } text-primary-green group-active:text-primary-white group-focus:text-primary-white absolute xl:left-[5em] left-[4em] xl:text-base lg:text-sm`}
            >
              Keluar
            </span>
          </button>
        </section>
      </aside>

      {/* Mobile */}

      <aside
        className={`fixed flex flex-col lg:hidden h-full md:w-[30%] sm:w-[45%] w-[60%] bg-primary-white shadow-md border-r border-slate-3 
        transition-all px-4 py-2 gap-5 z-50 ${
          getSiakadToogle ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header section */}
        <header className="flex w-full items-center gap-6">
          <figure>
            <Image
              src={"/illustrations/NusaVerse.svg"}
              alt="nusaverse"
              width={100}
              height={100}
              quality={100}
              className="sm:w-[4em] sm:h-[4em] w-[3em] h-[3em]"
            />
          </figure>
          <h1 className={`sm:text-lg text-base font-bold ease-in-out`}>{title}</h1>
        </header>

        <section className="w-full flex flex-col gap-2 items-center ease-in">
          {sideList.map((item, index) => (
            <Link
              key={index}
              href={`${item.link}`}
              className={`w-full flex items-center gap-4 text-center p-2.5 rounded-md duration-300 ease-in-out  ${
                item.link === path
                  ? "bg-primary-green"
                  : "hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green"
              }`}
            >
              <span
                className={`${
                  item.link === path
                    ? "text-primary-white"
                    : "text-primary-green group-active:text-primary-white group-focus:text-primary-white"
                }  text-xl`}
              >
                {item.icon}
              </span>
              <span
                className={`${
                  item.link === path
                    ? "text-primary-white"
                    : "text-primary-green group-active:text-primary-white group-focus:text-primary-white"
                } sm:text-base text-sm`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </section>

        {/* Footer section */}
        <section className="w-full flex flex-col gap-2 items-center ease-in xl:mt-[3rem] lg:mt-[2rem]">
          <Link
            href={`#`}
            className={`w-full flex items-center text-center p-2.5 gap-4 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-300 ease-in-out`}
          >
            <AiOutlineExclamationCircle className="text-xl text-primary-green group-active:text-primary-white group-focus:text-primary-white" />
            <span
              className={`text-primary-green group-active:text-primary-white group-focus:text-primary-white sm:text-base text-sm`}
            >
              Pusat Bantuan
            </span>
          </Link>
          <hr className="w-full" />
          <button
            onClick={onLogout}
            className={`w-full flex items-center text-center p-2.5 gap-4 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-300 ease-in-out`}
          >
            <AiOutlineLogout className="text-xl text-primary-green group-active:text-primary-white group-focus:text-primary-white" />

            <span
              className={`text-primary-green group-active:text-primary-white group-focus:text-primary-white sm:text-base text-sm`}
            >
              Keluar
            </span>
          </button>
        </section>
      </aside>
    </Fragment>
  );
};

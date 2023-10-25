import { FC, ReactElement, useState } from "react";
import { NusaVerseIcon } from "../../atoms";
import { TSidebarV2 } from "./types";
import Link from "next/link";
import { AiOutlineExclamationCircle, AiOutlineLogout } from "react-icons/ai";
export const SidebarV2: FC<TSidebarV2> = ({
  sideList,
  title = "Nama Modul",
  onLogout,
}): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <aside
      className={`lg:flex flex-col xl:gap-3 lg:gap-2 items-center hidden ${
        isOpen ? "xl:w-[20%] lg:w-[25%] md:w-[30%]" : "lg:w-[7%]"
      }  shadow-md border-r border-slate-3 transition-all px-4 py-1 duration-300 ease-in-out`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Header section */}
      <header className={`w-full flex items-center gap-5`}>
        <figure>
          <NusaVerseIcon className="xl:w-[4em] xl:h-[4em] lg:w-[2.5em] lg:h-[2.5em]" />
        </figure>

        <h1
          className={`xl:text-lg text-base font-bold ease-in-out duration-200 absolute xl:left-[5.5em] lg:left-[5em] ${
            isOpen ? "delay-150" : "opacity-0"
          }`}
        >
          {title}
        </h1>
      </header>

      {/* Sidebar list */}
      <section className="w-full flex flex-col gap-2 items-center ease-in">
        {sideList.map((item, index) => (
          <Link
            key={index}
            href={`${item.link}`}
            className={`${
              isOpen ? "w-full" : "xl:w-[70%] lg:w-[85%]"
            } flex items-center text-center p-2.5 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-150 ease-in-out `}
          >
            <span className="text-primary-green group-active:text-primary-white group-focus:text-primary-white xl:text-2xl lg:text-base">
              {item.icon}
            </span>
            <span
              className={`${
                isOpen ? "delay-150" : "opacity-0"
              } text-primary-green group-active:text-primary-white group-focus:text-primary-white absolute xl:left-[5em] lg:left-[4em] xl:text-base lg:text-sm`}
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
          className={`${
            isOpen ? "w-full" : "xl:w-[70%] lg:w-[85%]"
          } flex items-center text-center p-2.5 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-150 ease-in-out`}
        >
          <span className="text-2xl text-primary-green group-active:text-primary-white group-focus:text-primary-white xl:text-2xl lg:text-base">
            <AiOutlineExclamationCircle />
          </span>
          <span
            className={`${
              isOpen ? "delay-150" : "opacity-0"
            } text-primary-green group-active:text-primary-white group-focus:text-primary-white absolute xl:left-[5em] left-[4em] xl:text-base lg:text-sm`}
          >
            Pusat Bantuan
          </span>
        </Link>
        <hr className="w-full" />
        <button
          onClick={onLogout}
          className={`${
            isOpen ? "w-full" : "xl:w-[70%] lg:w-[85%]"
          } flex items-center text-center p-2.5 rounded-md hover:bg-secondary-green-0.5 group active:bg-primary-green focus:bg-primary-green duration-150 ease-in-out`}
        >
          <span className="text-2xl text-primary-green group-active:text-primary-white group-focus:text-primary-white xl:text-2xl lg:text-base">
            <AiOutlineLogout />
          </span>
          <span
            className={`${
              isOpen ? "delay-150" : "opacity-0"
            } text-primary-green group-active:text-primary-white group-focus:text-primary-white absolute xl:left-[5em] left-[4em] xl:text-base lg:text-sm`}
          >
            Keluar
          </span>
        </button>
      </section>
    </aside>
  );
};

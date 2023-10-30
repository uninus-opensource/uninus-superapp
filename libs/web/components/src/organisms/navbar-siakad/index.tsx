import { useSidebarSiakadToogle } from "@uninus/web/services";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { AiFillBell, AiFillCaretDown } from "react-icons/ai";

export const NavbarSiakad: FC = (): ReactElement => {
  const { setSiakadToogle } = useSidebarSiakadToogle();

  return (
    <header className="w-full h-[9vh] flex items-center justify-between border-b border-slate-3 px-6">
      <h1 className="text-lg font-bold ml-4 lg:block hidden">NEO Universitas Islam Nusantara</h1>

      <button
        className="bg-primary-green py-1 px-1.5 rounded-xl lg:hidden"
        onClick={() => {
          setSiakadToogle(true);
        }}
      >
        <Image
          src="/illustrations/NusaVerse-White.svg"
          alt="profile-picture"
          width={45}
          height={45}
          quality={100}
          className="sm:w-[2em] sm:h-[2em] w-[1.6em] h-[1.6em]"
        />
      </button>
      <nav className="flex gap-5 justify-between items-center">
        <button className="bg-primary-yellow p-2.5 rounded-xl">
          <AiFillBell className="sm:text-[1.3rem] text-[1rem]" />
        </button>
        <div className="flex items-center gap-4 cursor-pointer">
          <figure>
            <Image
              src="/illustrations/dummy-avatar.webp"
              alt="profile-picture"
              width={45}
              height={45}
              quality={100}
              className="rounded-full"
            />
          </figure>

          <div className="flex flex-col gap-1 justify-center text-left py-2 mt-1">
            <h4 className="flex gap-1 items-center text-sm font-semibold">
              M Nurfahmi Sugiarto <AiFillCaretDown className="text-base" />
            </h4>
            <h5 className="text-xs font-extramedium text-slate-5">41037006200011</h5>
          </div>
        </div>
      </nav>
    </header>
  );
};

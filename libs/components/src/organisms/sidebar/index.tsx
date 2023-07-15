'use client';
import { FC, ReactElement, useState } from 'react';
import Image from 'next/image';
import { TSideBarProps, TSideBarList } from './type';
import { AiFillHome, AiOutlineFileDone, AiOutlineLogout } from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../../atoms';
import dummyImage from '../../atoms/illustrations/dummy/dummy-avatar.jpg';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export const SideBar: FC<TSideBarProps> = ({
  profileName = '',
  profileEmail = '',
}): ReactElement => {
  const [onToogle, setOnToogle] = useState<boolean>(false);
  const { data: session } = useSession();
  const sideLists: TSideBarList[] = [
    { label: 'homepage', link: '/dashboard', icon: <AiFillHome /> },
    { label: 'data diri', link: '/dashboard/biodata', icon: <FaRegUser /> },
    {
      label: 'pendaftaran',
      link: '/dashboard/pendaftaran',
      icon: <AiOutlineFileDone />,
    },
  ];
  const pathname = usePathname();
  return (
    <>
      {/* Desktop */}
      <div className="min-h-full lg:relative fixed z-[99999]">
        <aside
          className={` sm:hidden h-full top-0 left-0 flex z-50 lg:relative transition-transform -translate-x-full lg:sm:translate-x-0 w-72 md:flex  bg-primary-white py-10`}
        >
          <section className={` w-full flex flex-col items-center gap-y-6`}>
            <h1 className="text-secondary-green-4 text-lg font-semibold">
              PMB UNINUS
            </h1>
            <div className="flex flex-row  items-center gap-x-6">
              <figure className="flex flex-row">
                <Image
                  className="rounded-full mx-2"
                  src={dummyImage}
                  alt="profile picture"
                  width={50}
                  height={50}
                  priority={true}
                />
                <figcaption className="text-center flex flex-col gap-y-3 mt-3  ">
                  <div className=" text-sm text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                    <h3>{session?.user?.name}</h3>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="w-[60%]  px-3 h-[1px] my-6 bg-slate-4"></div>
            <nav>
              <ul className="flex flex-col gap-y-6">
                {sideLists.map((sideList, idx, arr) => (
                  <li key={idx} className="flex flex-col gap-y-6">
                    <Link
                      href={sideList.link}
                      role="link"
                      className={`flex gap-x-3 text-lg capitalize ${
                        pathname === sideList.link &&
                        'bg-primary-white drop-shadow-md '
                      }hover:bg-primary-white   hover:text-secondary-green-1 items-center p-2   rounded-md`}
                    >
                      <p
                        className={`${
                          pathname === sideList.link &&
                          'bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg  text-primary-white'
                        } text-primary-green w-fit h-fit p-3 bg-primary-white drop-shadow-md rounded-lg`}
                      >
                        {sideList.icon}
                      </p>
                      <p className="text-primary-green text-md font-normal">
                        {sideList.label}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-between mt-96  group text-primary-green font-normal p-2 rounded-md">
              <div className="btn w-fit p-3 bg-primary-white drop-shadow-md rounded-lg">
                <AiOutlineLogout className="text-xl" />
              </div>
              <Button variant="sidebarbutton" size="sm" styling="text-xl mt-0 ">
                Log out
              </Button>
            </div>
          </section>
        </aside>

        {/* mobile */}
        <Button
          variant="text-icon"
          styling=" bg-primary-green bg-opacity-50  fixed z-50 inline-flex items-center text-primary-white top-5/6 flex bottom-10 right-8 rounded-md lg:hidden self-end justify-end items-end "
        >
          <BiMenuAltLeft
            className="mx-autotext-center cursor-pointer white "
            size={30}
            onClick={() => setOnToogle(!onToogle)}
          />
        </Button>

        {onToogle && (
          <motion.aside
            className={` h-full top-0 w-60 left-0 absolute z-50 lg:relative duration-75  transition-transform lg:sm:translate-x-0 bg-primary-white py-10`}
            aria-label="Sidebar"
            initial={
              onToogle
                ? { opacity: 0, translateX: -50 }
                : { opacity: 1, translateX: 0 }
            }
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
          >
            <section className={` w-full flex flex-col items-center  gap-y-6`}>
              <h1 className="text-secondary-green-4 text-lg font-bold">
                PMB UNINUS
              </h1>
              <div className="flex flex-row  items-center gap-x-6">
                <figure className="flex flex-row">
                  <Image
                    className="rounded-full mx-auto"
                    src={dummyImage}
                    alt="profile picture"
                    width={50}
                    height={50}
                    priority={true}
                  />
                  <figcaption className="text-center flex flex-col gap-y-2 mt-3  ">
                    <div className=" text-xs text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                      <h3>{session?.user?.name}</h3>
                    </div>
                    {/* <div>
                      <h1 className="font-semibold capitalize">
                        {session?.user?.name}
                      </h1>
                      <p className="font-base text-sm">
                        {session?.user?.email}
                      </p>
                    </div> */}
                  </figcaption>
                </figure>
              </div>
              <div className="w-[60%]  px-3 h-[1px] bg-slate-4"></div>
              <nav>
                <ul className="flex flex-col gap-y-6">
                  {sideLists.map((sideList, idx, arr) => (
                    <li key={idx} className="flex flex-col gap-y-6">
                      <Link
                        href={sideList.link}
                        role="link"
                        className={`flex gap-x-3 text-lg capitalize ${
                          pathname === sideList.link &&
                          'bg-primary-white drop-shadow-md '
                        }hover:bg-primary-white   hover:text-secondary-green-1 items-center p-2  rounded-md`}
                      >
                        <p
                          className={`${
                            pathname === sideList.link &&
                            'bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg  text-primary-white'
                          } text-primary-green w-fit h-fit p-3 bg-primary-white drop-shadow-md rounded-lg`}
                        >
                          {sideList.icon}
                        </p>
                        <p className="text-primary-green text-sm font-normal">
                          {sideList.label}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex text-2xl items-center my-8 group  p-2 rounded-md">
                <div className="icon text-primary-green w-fit p-2 drop-shadow-lg bg-primary-white rounded-lg">
                  <AiOutlineLogout />
                </div>
                <Button
                  variant="sidebarbutton"
                  size="sm"
                  styling="text-sm font-normal  text-primary-green mt-0"
                >
                  Log out
                </Button>
              </div>
            </section>
          </motion.aside>
        )}
      </div>
    </>
  );
};

import { FC, ReactElement, useState } from 'react';
import Image from 'next/image';
import { TSideBarProps, TSideBarList } from './type';
import {
  AiOutlineHome,
  AiOutlineFileDone,
  AiOutlineLogout,
} from 'react-icons/ai';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../../atoms';
import dummyImage from '../../atoms/illustrations/dummy/dummy-avatar.jpg';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export const SideBar: FC<TSideBarProps> = ({
  profileName = '',
  profileEmail = '',
}): ReactElement => {
  const [onToogle, setOnToogle] = useState<boolean>(false);
  const { data: session } = useSession();
  const sideLists: TSideBarList[] = [
    { label: 'home', link: '/dashboard', icon: <AiOutlineHome /> },
    { label: 'biodata', link: '/dashboard/biodata', icon: <FaRegUser /> },
    {
      label: 'pendaftaran',
      link: '/dashboard/pendaftaran',
      icon: <AiOutlineFileDone />,
    },
  ];
  return (
    <>
      {/* Desktop */}
      <div className="min-h-screen lg:relative fixed z-[99999]">
        <aside
          className={` sm:hidden h-full top-0 left-0 flex z-50 lg:relative transition-transform -translate-x-full lg:sm:translate-x-0 w-64 md:flex  bg-primary-green py-10 font-bebasNeue`}
        >
          <section className={` w-full flex flex-col items-center gap-y-6`}>
            <div className="flex flex-col gap-y-4 items-center">
              <figure>
                <Image
                  className="rounded-full mx-auto"
                  src={dummyImage}
                  alt="profile picture"
                  width={100}
                  height={100}
                  priority={true}
                />
                <figcaption className="text-center flex flex-col gap-y-2 mt-3 text-primary-white ">
                  <div className="bg-grayscale-1 text-xs text-secondary-green-1 p-2 font-medium rounded-md">
                    <h3>Calon Mahasiswa Baru</h3>
                  </div>
                  <div>
                    <h1 className="font-semibold capitalize">
                      {session?.user?.name}
                    </h1>
                    <p className="font-base text-sm">{session?.user?.email}</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <nav>
              <ul className="flex flex-col gap-y-6">
                {sideLists.map((sideList, idx, arr) => (
                  <li key={idx} className="flex flex-col gap-y-6">
                    <Link
                      href={sideList.link}
                      role="link"
                      className={`flex gap-x-3 text-lg capitalize hover:bg-primary-white hover:text-secondary-green-1 items-center p-2 rounded-md`}
                    >
                      {sideList.icon}
                      <p>{sideList.label}</p>
                    </Link>
                    {idx + 1 !== arr.length ? (
                      <div className="w-full h-[2px] bg-primary-black"></div>
                    ) : (
                      ''
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex text-2xl items-center my-8 group hover:bg-primary-white hover:text-secondary-green-1 p-2 rounded-md">
              <AiOutlineLogout />
              <Button
                variant="text-icon"
                size="sm"
                styling="text-xl hover:bg-primary-white"
              >
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
            className={` h-full top-0 w-60 left-0 absolute z-50 lg:relative duration-75  transition-transform lg:sm:translate-x-0 bg-primary-green py-10 font-bebasNeue`}
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
              <div className="flex flex-col gap-y-4 items-center">
                <figure>
                  <Image
                    className="rounded-full mx-auto"
                    src={dummyImage}
                    alt="profile picture"
                    width={100}
                    height={100}
                    priority={true}
                  />
                  <figcaption className="text-center flex flex-col gap-y-2 mt-3 text-primary-white ">
                    <div className="bg-grayscale-1 text-xs text-secondary-green-1 p-2 font-medium rounded-md">
                      <h3>Calon Mahasiswa Baru</h3>
                    </div>
                    <div>
                      <h1 className="font-semibold capitalize">
                        {session?.user?.name}
                      </h1>
                      <p className="font-base text-sm">
                        {session?.user?.email}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </div>
              <nav>
                <ul className="flex flex-col gap-y-6">
                  {sideLists.map((sideList, idx, arr) => (
                    <li key={idx} className="flex flex-col gap-y-6">
                      <Link
                        href={sideList.link}
                        role="link"
                        className={`flex gap-x-3 text-lg capitalize hover:bg-primary-white hover:text-secondary-green-1 items-center p-2 rounded-md`}
                      >
                        {sideList.icon}
                        <p>{sideList.label}</p>
                      </Link>
                      {idx + 1 !== arr.length ? (
                        <div className="w-full h-[2px] bg-primary-black"></div>
                      ) : (
                        ''
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex text-2xl items-center my-8 group hover:bg-primary-white hover:text-secondary-green-1 p-2 rounded-md">
                <AiOutlineLogout />
                <Button
                  variant="text-icon"
                  size="sm"
                  styling="text-xl hover:bg-primary-white"
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

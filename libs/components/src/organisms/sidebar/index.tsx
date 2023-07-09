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
export const SideBar: FC<TSideBarProps> = ({
  profileName = '',
  profileEmail = '',
}): ReactElement => {
  const [onToogle, setOnToogle] = useState<boolean>(true);

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
    <aside
      className={`${
        !onToogle ? 'w-16 transition-transform' : 'w-64 '
      } min-h-screen left-0 fixed top-0 flex z-50 flex-col  bg-primary-green py-10 font-bebasNeue duration-75 `}
    >
      <div className="w-full relative px-4 text-primary-white hover:text-secondary-green-3">
        <BiMenuAltLeft
          className="float-right cursor-pointer"
          size={30}
          onClick={() => setOnToogle(!onToogle)}
        />
      </div>
      <section
        className={`${
          !onToogle ? 'hidden' : ''
        } w-full flex flex-col items-center gap-y-6`}
      >
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
                <h1 className="font-semibold capitalize">{profileName}</h1>
                <p className="font-base text-sm">{profileEmail}</p>
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
        <div className="flex text-2xl items-center gr my-14 group hover:bg-primary-white hover:text-secondary-green-1 p-2 rounded-md">
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
  );
};

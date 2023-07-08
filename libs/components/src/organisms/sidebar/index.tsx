import { FC, ReactElement } from 'react';
import Image from 'next/image';
import { TSideBarProps, TSideBarList } from './type';
import {
  AiOutlineHome,
  AiOutlineFileDone,
  AiOutlineLogout,
} from 'react-icons/ai';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../../atoms';

export const SideBar: FC<TSideBarProps> = ({
  profilePicture = '',
  profileName = '',
  profileEmail = '',
}): ReactElement => {
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
    <aside className="h-screen sticky left-0 bg-primary-green w-72 flex flex-col items-center py-10 font-bebasNeue gap-y-6">
      <div className="flex flex-col gap-y-4 items-center">
        <figure>
          <Image
            className="rounded-full mx-auto"
            src={profilePicture}
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
      <div className="flex text-2xl items-center my-14 group hover:bg-primary-white hover:text-secondary-green-1 p-2 rounded-md">
        <AiOutlineLogout />
        <Button
          variant="text-icon"
          size="sm"
          styling="text-xl hover:bg-primary-white "
        >
          Log out
        </Button>
      </div>
    </aside>
  );
};

import Image from "next/image";
import { useNotificationSiakadToogle, useSidebarSiakadToogle } from "@uninus/web/services";
import { FC, Fragment, ReactElement, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { NotificationDropdown, ProfileDropdown } from "../../molecules";
import { NotificationButton } from "../../atoms";

export const NavbarSiakad: FC = (): ReactElement => {
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const { setSiakadToogle } = useSidebarSiakadToogle();
  const { getNotifToogle, setNotifToogle } = useNotificationSiakadToogle();

  const userData: { name: string; nim: string; notification_count: number } = {
    name: "M Nurfahmi Sugiarto",
    nim: "41037006200011",
    notification_count: 10,
  };

  return (
    <Fragment>
      <header className="w-full xl:h-[9vh] flex items-center justify-between border-b border-slate-3 px-6 z-20 ">
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
        <nav className="flex gap-5 md:justify-between items-center">
          <NotificationButton
            notification_count={userData.notification_count}
            onClick={() => {
              setNotifToogle(!getNotifToogle);
              setIsProfile(false);
            }}
          />
          <button
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              setIsProfile(!isProfile);
              setNotifToogle(false);
            }}
          >
            <figure>
              <Image
                src="/illustrations/dummy-avatar.webp"
                alt="profile-picture"
                width={45}
                height={45}
                quality={100}
                className="rounded-full "
              />
            </figure>

            <div className="flex flex-col gap-1 justify-center text-left py-2 mt-1">
              <h4 className="flex gap-1 items-center text-sm font-semibold">
                {userData.name}{" "}
                <AiFillCaretDown
                  className={`text-base duration-150 ${isProfile ? "rotate-180" : ""}`}
                />
              </h4>
              <h5 className="text-xs font-extramedium text-slate-5">{userData.nim}</h5>
            </div>
          </button>
        </nav>
      </header>
      <ProfileDropdown notification_counts={userData.notification_count} showProfile={isProfile} />
      <NotificationDropdown
        showNotification={getNotifToogle as boolean}
        closeNotification={() => setNotifToogle(false)}
      />
    </Fragment>
  );
};

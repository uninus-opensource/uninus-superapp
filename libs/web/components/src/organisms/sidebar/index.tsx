'use client';
import { FC, ReactElement, useState, useMemo } from 'react';
import Image from 'next/image';
import { TSideBarProps } from './type';
import { AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
import { Button } from '../../atoms';
import logOutImage from '../../atoms/illustrations/logOut/logOut.png';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Modal } from '../modal';
import { MenuOutlined } from '@ant-design/icons';

export const SideBar: FC<TSideBarProps> = ({
  onLogout,
  sideList,
}): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
    setOnToogle(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setOnToogle(!onToogle);
  };

  const [onToogle, setOnToogle] = useState<boolean>(false);
  const { data: session } = useSession();

  const userName = useMemo(() => {
    const userName = session?.user?.fullname;
    return userName;
  }, [session]);


  const userAvatar = useMemo(() => {
    const userName = session?.user?.avatar;
    return userName;
  }, [session]);

  const pathname = usePathname();

  return (
    <>
      <Modal
        showModal={showModal}
        modalTitle=" "
        onClose={handleCloseModal}
        iconClose={false}
        submitText="LogOut"
        closeText="Cancel"
      >
        <div className="modal flex flex-col justify-center items-center lg:flex lg:flex-row lg:py-10">
          <div className="img">
            <Image
              className=""
              src={logOutImage}
              alt="profile picture"
              width={300}
              height={300}
              priority={true}
            />
          </div>
          <div className="txt mt-4 lg:mt-0">
            <div className="">
              <h1 className="font-extrabold text-3xl text-primary-black mb-2">
                Log Out
              </h1>
              <h1 className="text-primary-black">
                Apakah Anda yakin ingin keluar?
              </h1>
            </div>
            <div className="button flex gap-x-3 pt-4">
              <Button
                variant="elevated"
                onClick={onLogout}
                styling="w-1/2 font-normal"
              >
                Keluar
              </Button>
              <Button
                variant="green-outline"
                onClick={handleCloseModal}
                styling="w-1/2 font-normal"
              >
                Tetap Disini
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {showModal && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={handleCloseModal}
        />
      )}
      {/* Desktop */}
      <aside
        className={`sm:hidden lg:h-screen lg:relative fixed lg:w-[30vw] bg-sky-3 h-auto left-0 flex z-40 shadow-lg transition-transform 2xl:w-80 overflow-y-auto lg:overflow-hidden  -translate-x-full lg:sm:translate-x-0 w-[240px] md:flex bg-grayscale-1 py-6`}
      >
        <section className={` w-full flex flex-col items-center  `}>
          <h1 className="text-secondary-green-4 text-lg font-bold 2xl:text-xl">
            PMB UNINUS
          </h1>

          <figure className="flex flex-col items-center  ">
            <Image
              className="rounded-full "
              src={userAvatar ||'/illustrations/dummy-avatar.webp'}
              alt="profile picture"
              width={70}
              height={70}
              priority={true}
            />
            <figcaption className="text-center flex flex-col gap-y-3 mt-3  ">
              <div className=" text-sm text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                <h3>{userName}</h3>
              </div>
            </figcaption>
          </figure>
          {/* Status pendaftaran */}
          <div className="w-3/5 mt-2 font-bold bg-red-3 text-red-4 p-2 rounded-md text-center text-xs">
            Belum Mendaftar
          </div>
          {/* End Status pendaftaran */}
          <hr className="w-3/4 my-2" />

          <div className="flex flex-col h-full justify-between 2xl:h-full">
            <nav>
              <ul className="flex flex-col gap-y-6 lg:gap-y-4">
                {sideList?.map((sideList, idx) => (
                  <li key={idx} className="flex flex-col gap-y-6">
                    <Link
                      href={sideList?.link}
                      role="link"
                      className={`flex gap-x-3 text-lg capitalize ${
                        pathname === sideList?.link &&
                        'bg-primary-white drop-shadow-md '
                      }hover:bg-primary-white group hover:shadow-md  hover:text-secondary-green-1 items-center p-2 rounded-md`}
                    >
                      <p
                        className={`${
                          pathname === sideList?.link &&
                          'bg-gradient-to-br from-[#60ffab] to-primary-green shadow-lg  text-primary-white'
                        } text-primary-green w-fit h-fit p-3 group-hover:bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg group-hover:text-primary-white bg-primary-white drop-shadow-md rounded-lg flex justify-center items-center`}
                      >
                        {sideList?.icon}
                      </p>
                      <p className="text-primary-green text-[15px] w-[6.8vw] font-normal">
                        {sideList?.label}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex relative bottom-0 ml-2 hover:shadow-md text-primary-green font-normal rounded-md ">
              <Button
                variant="sidebarbutton"
                size="sm"
                styling="text-xl -ml-4 mt-0 items-center flex"
                onClick={handleOpenModal}
              >
                <AiOutlineLogout
                  size={40}
                  className="mr-3 text-primary-green w-fit p-2 drop-shadow-lg bg-primary-white hover:bg-primary-green rounded-lg "
                />
                <p className="text-primary-green text-sm font-normal">Keluar</p>
              </Button>
            </div>
          </div>
        </section>
      </aside>

      {/* mobile */}
      <Button
        variant="text-icon"
        styling="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-primary-green fixed z-50 inline-flex items-center text-primary-white top-5/6 flex bottom-10 right-8 rounded-md lg:hidden self-end justify-end items-end"
        onClick={() => setOnToogle(!onToogle)}
      >
        <MenuOutlined className="mx-autotext-center cursor-pointer text-primary-white text-[1.5rem]" />
      </Button>

      {onToogle && (
        <>
          <div
            className="mobile-sidebar-overlay fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-50"
            onClick={() => setOnToogle(false)}
          />
          <motion.aside
            className="h-screen lg:hidden top-0 w-60 left-0 shadow-lg absolute overflow-hidden z-50 duration-75 overflow-y-auto transition-transform bg-grayscale-1 py-5"
            aria-label="Sidebar"
            initial={
              onToogle
                ? { opacity: 0, translateX: -50 }
                : { opacity: 1, translateX: 0 }
            }
            animate={{ opacity: 1, translateX: onToogle ? 0 : -50 }}
            transition={{ duration: 0 }}
            style={{ pointerEvents: onToogle ? 'auto' : 'none' }}
          >
            <section className={` w-full flex flex-col items-center  gap-y-6`}>
              <h1 className="text-secondary-green-4 text-lg font-bold">
                PMB UNINUS
              </h1>
              <div className="flex flex-row  items-center gap-x-6">
                <figure className="flex flex-col">
                  <Image
                    className="rounded-full mx-auto"
                    src={'/illustrations/dummy-avatar.webp'}
                    alt="profile picture"
                    width={70}
                    height={70}
                    priority={true}
                  />
                  <figcaption className="text-center flex flex-col gap-y-2 mt-3  ">
                    <div className=" text-xs text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                      <h3 className="max-w-3/5 text-base leading-normal">
                        {userName}
                      </h3>
                    </div>
                  </figcaption>
                </figure>
              </div>
              {/* Status pendaftaran */}
              <div className="w-3/5 mt-2 bg-red-3 text-red-4  p-2 font-bold rounded-md text-center text-xs">
                Belum Mendaftar
              </div>
              {/* End Status pendaftaran */}
              <div className="w-[60%]  px-3 h-[1px] bg-slate-4"></div>
              <nav>
                <ul className="flex flex-col gap-y-6">
                  {sideList?.map((sideList, idx) => (
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
                <div className="flex text-sm relative bottom-0 items-start my-8 py-2 rounded-md">
                  <Button
                    variant="sidebarbutton"
                    size="sm"
                    styling="text-sm font-normal text-primary-green mt-0 p-0"
                    onClick={handleOpenModal}
                  >
                    <AiOutlineLogout
                      size={45}
                      className="mr-3 text-primary-green w-fit p-3 drop-shadow-lg bg-primary-white hover:bg-primary-green rounded-lg "
                    />
                    <p className="text-primary-green">Keluar</p>
                  </Button>
                </div>
              </nav>
            </section>
          </motion.aside>
        </>
      )}
    </>
  );
};

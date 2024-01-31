"use client";
import { FC, ReactElement, useState, useMemo, Fragment, useEffect } from "react";
import Image from "next/image";
import { TSideBarProps } from "./type";
import { AiOutlineDown, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { Button } from "../../atoms";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Modal } from "../modal";
import { MenuOutlined, AppstoreFilled } from "@ant-design/icons";
import { useUserGet } from "./hooks";
import { useUpdateAvatar, useUpdateFullname, useUserData } from "@uninus/web/services";
import { Loading } from "./loading";

export const SideBar: FC<TSideBarProps> = ({
  onLogout,
  sideList,
  moduleName = "PMB ADMIN",
}): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null | undefined>(null);
  const [onToogle, setOnToogle] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
    setOnToogle(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOnToogle(!onToogle);
  };

  const { data, isLoading } = useUserGet();

  const { getUser, setUser } = useUserData();

  const { getUpdateAvatar } = useUpdateAvatar();
  const { getFullname } = useUpdateFullname();

  const userName = useMemo(() => {
    const userName = getUser?.fullname;
    return userName;
  }, [getUser]);

  const userAvatar = useMemo(() => {
    const userName = getUser?.avatar;
    return userName;
  }, [getUser]);

  const userStatus = useMemo(() => {
    const userStatus = getUser?.registrationStatus;
    return userStatus;
  }, [getUser]);

  const conditionalStatus = (status?: string | null): ReactElement => {
    return (
      <div
        className={`w-3/5 font-bold p-2 rounded-md text-center text-xs ${
          status === "Belum Mendaftar" ||
          status === "Belum Membayar" ||
          status === "Anda Tidak Lolos"
            ? "bg-red-3 text-red-4 "
            : status === "Sudah Membayar" || status === "Anda Lolos Seleksi"
              ? "bg-secondary-green-0.5 text-grayscale-9"
              : "bg-secondary-yellow-2 text-grayscale-9"
        }`}
      >
        {status}
      </div>
    );
  };

  useEffect(() => {
    setUser(data);
  }, [data, setUser]);

  useEffect(() => {
    setAvatar(userAvatar);
  }, [userAvatar]);

  const pathname = usePathname();

  return (
    <Fragment>
      <Modal showModal={showModal} onClose={handleCloseModal} iconClose={false}>
        <div className="modal flex flex-col justify-center items-center lg:flex lg:flex-row lg:py-10">
          <div className="img">
            <Image
              className=""
              src={"/illustrations/logOut.webp"}
              quality={100}
              alt="profile picture"
              width={300}
              height={300}
              priority={true}
            />
          </div>
          <div className="txt mt-4 lg:mt-0">
            <div className="">
              <h1 className="font-extrabold text-3xl text-primary-black mb-2">Log Out</h1>
              <h1 className="text-primary-black">Apakah Anda yakin ingin keluar?</h1>
            </div>
            <div className="button flex gap-x-3 pt-4">
              <Button variant="elevated" onClick={onLogout} styling="w-1/2 font-normal">
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

      {/* Desktop */}
      <aside
        data-testid="sidebar"
        className={`sm:hidden lg:h-screen lg:relative fixed lg:w-[30vw] xl:w-[25vw] bg-sky-3 h-auto left-0 flex z-40 shadow-lg transition-transform  overflow-y-auto lg:overflow-hidden -translate-x-full lg:sm:translate-x-0 w-[240px] md:flex bg-grayscale-1 py-6`}
      >
        <section className={` w-full flex flex-col items-center gap-y-1`}>
          <h1 className="text-secondary-green-4 text-lg font-bold 2xl:text-xl">
            {process.env.NEXT_PUBLIC_WORKSPACE === "admin" ? moduleName : "PMB UNINUS"}
          </h1>
          <figure className="flex flex-col items-center">
            <Image
              className="w-[80px] h-[80px] bg-cover object-cover rounded-full"
              src={getUpdateAvatar || avatar || "/illustrations/dummy-avatar.webp"}
              alt="profile picture"
              quality={100}
              width={500}
              height={500}
              priority={true}
            />
            <figcaption className="text-center flex flex-col  ">
              <div className=" text-sm text-secondary-green-4 p-2 font-bold rounded-md leading-[14px] capitalize">
                <h3>{getFullname || userName}</h3>
              </div>
            </figcaption>
          </figure>
          {/* Status pendaftaran */}
          {process.env.NEXT_PUBLIC_WORKSPACE === "user" &&
            (isLoading ? (
              <div className="w-3/5 mt-2 font-bold p-2 rounded-md bg-grayscale-2 animate-pulse h-10"></div>
            ) : (
              conditionalStatus(userStatus)
            ))}

          {/* End Status pendaftaran */}
          <hr className="w-3/4 my-2" />

          <div className="flex flex-col h-full justify-between 2xl:h-full">
            <nav>
              <ul className="flex flex-col items-start">
                {process.env.NEXT_PUBLIC_WORKSPACE === "user" &&
                  (isLoading ? (
                    <Loading />
                  ) : (
                    sideList?.map((sideList, idx) => (
                      <li key={idx} className="flex flex-col gap-y-2">
                        <Link
                          href={sideList?.link as string}
                          role="link"
                          className={`flex relative gap-x-3 xl:text-lg capitalize h-11 xl:h-auto items-center p-2 rounded-md ${
                            pathname === sideList?.link && "bg-primary-white drop-shadow-md w-full "
                          } ${
                            sideList.disabledStatus
                              ? "pointer-events-none "
                              : "hover:bg-primary-white group hover:shadow-md hover:text-secondary-green-1"
                          }`}
                        >
                          <p
                            className={`w-11 h-9 xl:w-fit xl:h-fit p-3 drop-shadow-md rounded-lg flex justify-center items-center ${
                              pathname === sideList?.link &&
                              "bg-gradient-to-br from-[#60ffab] to-primary-green shadow-lg text-primary-white"
                            }  group-hover:bg-gradient-to-br from-[#60ffab] to-primary-green shadow-lg group-hover:text-primary-white bg-primary-white ${
                              sideList.disabledStatus ? "text-grayscale-2" : "text-primary-green"
                            } `}
                          >
                            {sideList?.icon}
                          </p>
                          <p
                            className={`${
                              sideList.disabledStatus ? "text-grayscale-2" : "text-primary-green"
                            } text-xs xl:text-base w-[22vh] font-normal`}
                          >
                            {sideList?.label}
                          </p>
                        </Link>
                      </li>
                    ))
                  ))}

                {process.env.NEXT_PUBLIC_WORKSPACE === "admin" &&
                  sideList?.map((sideList, idx) => (
                    <li key={idx} className="flex flex-col">
                      {sideList.sideDropdown ? (
                        <Fragment>
                          <button
                            onClick={sideList.onClick}
                            className={`flex relative gap-x-3 xl:text-lg capitalize h-11 xl:h-auto duration-200 ${
                              sideList.sideDropdown
                                ? `${sideList.isDropdown ? "bg-primary-white mt-2" : ""}`
                                : ""
                            } ${
                              pathname === sideList?.link &&
                              "bg-primary-white drop-shadow-md w-full "
                            }hover:bg-primary-white group hover:shadow-md  hover:text-secondary-green-1 items-center p-2 rounded-md`}
                          >
                            <p
                              className={`${
                                pathname === sideList?.link &&
                                "bg-gradient-to-br from-[#60ffab] to-primary-green shadow-lg  text-primary-white"
                              } text-primary-green w-11 h-9 xl:w-fit xl:h-fit p-3 group-hover:bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg group-hover:text-primary-white bg-primary-white drop-shadow-md rounded-lg flex justify-center items-center`}
                            >
                              {sideList?.icon}
                            </p>
                            <p className="flex items-center justify-between text-primary-green text-left text-xs xl:text-base w-[22vh] font-normal">
                              {sideList?.label}
                              <AiOutlineDown
                                className={`${
                                  sideList.isDropdown ? "rotate-180" : ""
                                } xl:text-lg lg:text-base xl:mr-8 lg:mr-4`}
                              />
                            </p>
                          </button>

                          {sideList.isDropdown &&
                            sideList?.sideDropdownList?.map((sideDropdownList, idx) => (
                              <Link
                                href={sideDropdownList?.link}
                                key={idx}
                                role="link"
                                className={`flex relative gap-x-3 xl:text-lg capitalize h-11 xl:h-auto duration-150 ${
                                  pathname === sideDropdownList?.link && "w-full"
                                } group  items-center p-2 rounded-md ${
                                  sideDropdownList?.icon
                                    ? "hover:shadow-md hover:text-secondary-green-1"
                                    : "hover:bg-secondary-green-0.5"
                                }`}
                              >
                                {sideDropdownList?.icon ? (
                                  <Fragment>
                                    <p
                                      className={`${
                                        pathname === sideDropdownList?.link &&
                                        "bg-gradient-to-br from-[#60ffab] to-primary-green shadow-lg  text-primary-white"
                                      } text-primary-green w-11 h-9 xl:w-fit xl:h-fit p-3 group-hover:bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg group-hover:text-primary-white bg-primary-white drop-shadow-md rounded-lg flex justify-center items-center`}
                                    >
                                      {sideDropdownList?.icon}
                                    </p>
                                    <p className="text-primary-green text-xs xl:text-base w-[22vh] font-normal">
                                      {sideDropdownList?.label}
                                    </p>
                                  </Fragment>
                                ) : (
                                  <p className="flex justify-center items-center text-primary-green text-base w-full h-[3em] font-normal">
                                    {sideDropdownList?.label}
                                  </p>
                                )}
                              </Link>
                            ))}
                        </Fragment>
                      ) : (
                        <Link
                          href={sideList?.link as string}
                          role="link"
                          className={`flex relative gap-x-3 xl:text-lg capitalize h-11 xl:h-auto ${
                            pathname === sideList?.link && "bg-primary-white drop-shadow-md w-full "
                          }hover:bg-primary-white group hover:shadow-md  hover:text-secondary-green-1 items-center p-2 rounded-md`}
                        >
                          <p
                            className={`${
                              pathname === sideList?.link &&
                              "bg-gradient-to-br from-[#60ffab] to-primary-green shadow-lg  text-primary-white"
                            } text-primary-green w-11 h-9 xl:w-fit xl:h-fit p-3 group-hover:bg-gradient-to-br from-[#60ffab]  to-primary-green shadow-lg group-hover:text-primary-white bg-primary-white drop-shadow-md rounded-lg flex justify-center items-center`}
                          >
                            {sideList?.icon}
                          </p>
                          <p className="text-primary-green text-xs xl:text-base w-[22vh] font-normal">
                            {sideList?.label}
                          </p>
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </nav>
            <div className="flex relative bottom-0 ml-2 hover:shadow-md text-primary-green font-normal rounded-md mt-2 ">
              <Button
                variant="sidebarbutton"
                size="sm"
                styling="text-xl -ml-4 mt-0 items-center flex group"
                onClick={handleOpenModal}
              >
                <AiOutlineLogout
                  size={40}
                  className="mr-3 text-primary-green p-2 drop-shadow-lg bg-primary-white group-hover:bg-gradient-to-br from-[#60ffab]  to-primary-green group-hover:text-primary-white rounded-lg"
                />
                <p className="text-primary-green text-sm xl:text-base font-normal">Keluar</p>
              </Button>
            </div>
          </div>
        </section>
      </aside>

      <Button
        variant="text-icon"
        styling="shadow-md bg-primary-green fixed z-50 inline-flex items-center text-primary-white top-5/6 flex bottom-10 right-8 rounded-md lg:hidden self-end justify-end items-end"
        onClick={() => setOnToogle(!onToogle)}
      >
        <MenuOutlined className="md:hidden mx-auto text-center cursor-pointer text-primary-white text-[1.5rem]" />
        <AppstoreFilled className="hidden md:block mx-auto text-center cursor-pointer text-primary-white text-[1.5rem]" />
      </Button>

      {/* mobile */}
      {onToogle && (
        <Fragment>
          <div
            className="mobile-sidebar-overlay fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-50"
            onClick={() => setOnToogle(false)}
          />
          <motion.aside
            className="h-screen lg:hidden top-0 w-60 left-0 shadow-lg absolute overflow-hidden z-50 duration-75 overflow-y-auto transition-transform bg-grayscale-1 py-5"
            aria-label="Sidebar"
            initial={onToogle ? { opacity: 0, translateX: -50 } : { opacity: 1, translateX: 0 }}
            animate={{ opacity: 1, translateX: onToogle ? 0 : -50 }}
            transition={{ duration: 0 }}
            style={{ pointerEvents: onToogle ? "auto" : "none" }}
          >
            <section className={` w-full flex flex-col items-center gap-y-6`}>
              <h1 className="text-secondary-green-4 text-lg font-bold">
                {process.env.NEXT_PUBLIC_WORKSPACE === "admin" ? moduleName : "PMB UNINUS"}
              </h1>
              <div className="flex flex-row  items-center gap-x-6">
                <figure className="flex flex-col items-center">
                  <Image
                    className="w-[80px] h-[80px] bg-cover object-cover rounded-full"
                    src={avatar || "/illustrations/dummy-avatar.webp"}
                    alt="profile picture"
                    quality={100}
                    width={500}
                    height={500}
                    priority={true}
                  />
                  <figcaption className="text-center flex flex-col gap-y-2 mt-3">
                    <div className=" text-xs text-secondary-green-4 p-2 font-bold rounded-md leading-[14px]">
                      <h3 className="max-w-3/5 text-base leading-normal capitalize">{userName}</h3>
                    </div>
                  </figcaption>
                </figure>
              </div>
              {/* Status pendaftaran */}
              {process.env.NEXT_PUBLIC_WORKSPACE === "user" &&
                (isLoading ? (
                  <div className="w-3/5 font-bold p-2 rounded-md bg-grayscale-2 animate-pulse h-10"></div>
                ) : (
                  conditionalStatus(userStatus)
                ))}
              {/* End Status pendaftaran */}
              <div className="w-[60%] px-3 h-[1px] bg-slate-4"></div>
              <nav>
                <ul className="flex flex-col h-full justify-between gap-y-1">
                  {process.env.NEXT_PUBLIC_WORKSPACE === "user" &&
                    sideList?.map((sideList, idx) => (
                      <li key={idx} className="flex flex-col gap-y-6">
                        <Link
                          href={sideList.link as string}
                          role="link"
                          className={`flex gap-x-3 text-lg capitalize items-center p-2 rounded-md h-auto${
                            pathname === sideList.link && "bg-primary-white drop-shadow-md "
                          } ${
                            sideList.disabledStatus
                              ? "pointer-events-none "
                              : "hover:bg-primary-white group hover:shadow-md hover:text-secondary-green-1"
                          }`}
                        >
                          <p
                            className={`flex items-center w-fit justify-center p-3 shadow-lg rounded-lg ${
                              pathname === sideList.link &&
                              " bg-gradient-to-br from-[#60ffab] to-primary-green text-primary-white"
                            }  bg-primary-white drop-shadow-md ${
                              sideList.disabledStatus ? "text-grayscale-2" : "text-primary-green"
                            } `}
                          >
                            {sideList.icon}
                          </p>
                          <p
                            className={`${
                              sideList.disabledStatus ? "text-grayscale-2" : "text-primary-green"
                            } text-sm font-normal`}
                          >
                            {sideList.label}
                          </p>
                        </Link>
                      </li>
                    ))}
                  {/*
                  {process.env.NEXT_PUBLIC_WORKSPACE === "admin" &&
                    sideList?.map((sideList, idx) => (
                      <li key={idx} className="flex flex-col gap-y-6">
                        <Link
                          href={sideList.link as string}
                          role="link"
                          className={`flex gap-x-3 text-lg capitalize items-center p-2 rounded-md h-auto${
                            pathname === sideList.link && "bg-primary-white drop-shadow-md "
                          }hover:bg-primary-white hover:text-secondary-green-1 `}
                        >
                          <p
                            className={`flex items-center w-fit justify-center p-3 shadow-lg rounded-lg ${
                              pathname === sideList.link &&
                              " bg-gradient-to-br from-[#60ffab] to-primary-green  text-primary-white"
                            } text-primary-green bg-primary-white drop-shadow-md `}
                          >
                            {sideList.icon}
                          </p>
                          <p className="text-primary-green text-sm font-normal">{sideList.label}</p>
                        </Link>
                      </li>
                    ))} */}
                  {process.env.NEXT_PUBLIC_WORKSPACE === "admin" &&
                    sideList?.map((sideList, idx) => (
                      <li key={idx} className="flex flex-col">
                        {sideList.sideDropdown ? (
                          <Fragment>
                            <button
                              onClick={sideList.onClick}
                              className={`flex gap-x-3 text-lg capitalize items-center p-2 rounded-md h-auto w-[12em] max-w-[12em] ${
                                pathname === sideList.link && "bg-primary-white drop-shadow-md "
                              }hover:bg-primary-white hover:text-secondary-green-1 `}
                            >
                              <p
                                className={`flex items-center w-fit justify-center p-3 shadow-lg rounded-lg ${
                                  pathname === sideList.link &&
                                  " bg-gradient-to-br from-[#60ffab] to-primary-green  text-primary-white"
                                } text-primary-green bg-primary-white drop-shadow-md `}
                              >
                                {sideList?.icon}
                              </p>
                              <p className="flex items-center justify-between w-full text-primary-green text-sm font-normal">
                                {sideList.label}
                                <AiOutlineDown
                                  className={`${
                                    sideList.isDropdown ? "rotate-180" : ""
                                  } text-lg mr-5`}
                                />
                              </p>
                            </button>

                            {sideList.isDropdown &&
                              sideList?.sideDropdownList?.map((sideDropdownList, idx) => (
                                <Link
                                  href={sideDropdownList?.link}
                                  key={idx}
                                  role="link"
                                  className={`flex gap-x-3 text-lg capitalize items-center p-2 rounded-md h-auto ${
                                    pathname === sideDropdownList.link &&
                                    "bg-primary-white drop-shadow-md "
                                  }hover:bg-primary-white hover:text-secondary-green-1 `}
                                >
                                  <p
                                    className={`flex items-center w-fit justify-center p-3 shadow-lg rounded-lg ${
                                      pathname === sideDropdownList.link &&
                                      " bg-gradient-to-br from-[#60ffab] to-primary-green  text-primary-white"
                                    } text-primary-green bg-primary-white drop-shadow-md `}
                                  >
                                    {sideDropdownList?.icon}
                                  </p>
                                  <p className="text-primary-green text-sm font-normal">
                                    {sideDropdownList.label}
                                  </p>
                                </Link>
                              ))}
                          </Fragment>
                        ) : (
                          <Link
                            href={sideList?.link as string}
                            role="link"
                            className={`flex gap-x-3 text-lg capitalize items-center p-2 rounded-md h-auto ${
                              pathname === sideList.link && "bg-primary-white drop-shadow-md "
                            }hover:bg-primary-white hover:text-secondary-green-1 `}
                          >
                            <p
                              className={`flex items-center w-fit justify-center p-3 shadow-lg rounded-lg ${
                                pathname === sideList.link &&
                                " bg-gradient-to-br from-[#60ffab] to-primary-green  text-primary-white"
                              } text-primary-green bg-primary-white drop-shadow-md `}
                            >
                              {sideList?.icon}
                            </p>
                            <p className="text-primary-green text-sm font-normal">
                              {sideList?.label}
                            </p>
                          </Link>
                        )}
                      </li>
                    ))}
                </ul>

                <div className="flex w-full h-full items-center pt-16">
                  <Button variant="sidebarbutton" size="sm" onClick={handleOpenModal}>
                    <AiOutlineLogout
                      size={45}
                      className="mr-3 text-primary-green w-fit p-3 drop-shadow-lg bg-primary-white group-hover:bg-gradient-to-br from-[#60ffab]  to-primary-green group-hover:text-primary-white rounded-lg "
                    />
                    <p className="h-ful text-center text-primary-green text-sm font-normal">
                      Keluar
                    </p>
                  </Button>
                </div>
              </nav>
            </section>
          </motion.aside>
        </Fragment>
      )}
    </Fragment>
  );
};

import Image from "next/image";
import { FC, ReactElement } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { TProfileDropdown, TUserData, TInfoProfile, TKeteranganLulus } from "./types";

export const ProfileDropdown: FC<TProfileDropdown> = ({ showProfile }): ReactElement | false => {
  const userData: TUserData = {
    name: "M Nurfahmi Sugiarto",
    nim: "41037006200011",
  };

  const infoProfile: TInfoProfile = [
    {
      name: "Kelas",
      description: "Reguler",
    },
    {
      name: "Program Studi",
      description: "S1 - Teknik Informatika",
    },
    {
      name: "Angkatan",
      description: "2020",
    },
    {
      name: "Periode",
      description: "2023/2024 Ganjil",
    },
  ];

  const keterangan = (ket: TKeteranganLulus): ReactElement => {
    return (
      <p
        className={`flex items-center justify-center p-2 text-[10px] w-[35%] h-[23px] rounded-sm font-semibold ${
          ket === "Aktif"
            ? "text-primary-green bg-secondary-green-0.5"
            : ket === "Cuti"
            ? "text-primary-yellow bg-secondary-yellow-1"
            : ket === "Tidak Aktif"
            ? "text-error-600 bg-secondary-orange-1"
            : ket === "Lulus"
            ? "text-primary-green bg-secondary-green-0.5"
            : "hidden"
        }`}
      >
        {ket}
      </p>
    );
  };
  return (
    showProfile && (
      <section className="flex flex-col w-[20vw] p-2 gap-2 absolute shadow-md z-20 bg-primary-white right-0 rounded-b-md xl:top-[4rem] lg:top-[3.5rem]">
        <div className="flex items-center gap-4 xl:ml-2">
          <figure>
            <Image
              src="/illustrations/dummy-avatar.webp"
              alt="profile-picture"
              width={100}
              height={100}
              quality={100}
              className="rounded-full xl:w-[45px] xl:h-[45px] w-[40px] h-[40px]"
            />
          </figure>
          <div className="flex flex-col gap-1 justify-center text-left py-2 mt-1">
            <h4 className="flex gap-1 items-center xl:text-sm text-xs font-semibold">
              {userData.name}
            </h4>
            <h5 className="xl:text-sm text-[10px] font-extramedium text-grayscale-5.5">
              {userData.nim}
            </h5>
            {keterangan("Cuti")}
          </div>
        </div>
        <hr className="w-full border-slate-4" />
        <div className="grid grid-cols-2 gap-2 p-0.5 xl:ml-2">
          {infoProfile.map((item, index) => (
            <div key={index} className="flex flex-col gap-0.5">
              <h3 className="xl:text-sm text-xs font-semibold">{item.name}</h3>
              <h5 className="xl:text-[10px] text-[8px]">{item.description}</h5>
            </div>
          ))}
        </div>
        <hr className="w-full border-slate-4" />

        <div className="w-full xl:ml-2">
          <button className="flex items-center h-[1.4rem] gap-2 bg-primary-green py-1 px-2 xl:text-xs text-[11px] rounded-[4px] text-primary-white">
            Edit Profil <AiOutlineEdit className="xl:text-base text-sm" />
          </button>
        </div>
      </section>
    )
  );
};

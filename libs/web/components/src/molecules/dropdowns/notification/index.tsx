import { FC, ReactElement } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TNotificationDropdownProps } from "./types";
import { SelectOption } from "../../inputs";
import { useForm } from "react-hook-form";
import { Notif } from "../../../atoms";

export const NotificationDropdown: FC<TNotificationDropdownProps> = ({
  showNotification,
  closeNotification,
}): ReactElement | false => {
  const { control } = useForm({
    mode: "all",
  });

  //   const allNews: TAllNews[] = [
  //     {
  //       news: "sayembara akademik 2023/2024",
  //       time: new Date().getTime(),
  //     },
  //     {
  //       news: "sayembara logo rebranding",
  //       time: Date.now(),
  //     },
  //     {
  //       news: "pendaftaran program Merdeka Belajar Kampus Merdeka(MBKM) 2023",
  //       time: Date.now(),
  //     },
  //   ];

  return (
    showNotification && (
      <section className="flex flex-col w-[20rem] pt-4 gap-4 absolute shadow-md z-20 bg-primary-white right-4 rounded-b-md top-[4rem] xl:top-[4.5rem]">
        {/* header */}
        <div className="flex w-full justify-between items-center px-4">
          <h3 className="text-base font-semibold">Notifikasi</h3>
          <button className="cursor-pointer" onClick={closeNotification}>
            <AiOutlineCloseCircle className="text-2xl" />
          </button>
        </div>

        <div className="flex w-full justify-between items-center px-4">
          <SelectOption
            name="filter"
            control={control}
            options={[{ label: "Semua", value: "all" }]}
            placeholder="Pilih Opsi"
            className="w-[9rem]"
            isClearable={true}
            isSearchable={false}
            isBordered
            selectColor="white"
            optionColor="white"
          />
          <button className="font-semibold text-[10px] text-primary-green">
            Tandai sudah dibaca
          </button>
        </div>

        {/* content */}
        <div className="w-full flex flex-col">
          {/* hari ini */}
          <div className="flex items-center px-4 py-2 bg-slate-1">
            <h3 className="text-sm font-semibold">Hari Ini</h3>
          </div>
          <Notif news="sayembara akademik 2023/2024" time="1j yang lalu" />

          {/* sebelumnya */}
          <div className="flex items-center px-4 py-2 bg-slate-1">
            <h3 className="text-sm font-semibold">Sebelumnya</h3>
          </div>
          <div className="flex flex-col w-full gap-1">
            <Notif news="sayembara logo rebranding" time="1j yang lalu" />
            <div className="w-full px-4">
              <hr className="w-full border-slate-4" />
            </div>
            <Notif
              news="pendaftaran program Merdeka Belajar Kampus Merdeka(MBKM) 2023"
              time="1j yang lalu"
            />
          </div>
        </div>

        {/* footer */}
        <button className="flex items-center justify-center p-4 bg-slate-1 rounded-b-md">
          <h3 className="text-base font-semibold text-primary-green">Lihat Semua</h3>
        </button>
      </section>
    )
  );
};

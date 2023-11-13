import { FC, ReactElement } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { TNotifProps } from "./type";

export const Notif: FC<TNotifProps> = ({ news, time }): ReactElement => {
  return (
    <nav className="flex items-center w-full p-4 gap-6 font-semibold cursor-pointer hover:bg-slate-2 ">
      <AiOutlineNotification className="text-[2.5rem] text-primary-green" />
      <div className="flex flex-col w-full gap-1 text-grayscale-6.5 text-xs">
        <p>
          Pengumuman <span className="text-primary-green">{news}</span>
        </p>
        <span>{time}</span>
      </div>
    </nav>
  );
};

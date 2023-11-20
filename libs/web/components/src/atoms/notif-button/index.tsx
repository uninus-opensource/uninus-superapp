import { FC, ReactElement } from "react";
import { AiFillBell } from "react-icons/ai";
import { TNotifProps } from "./types";

export const NotificationButton: FC<TNotifProps> = ({
  position,
  onClick,
  mobile,
  notification_count,
}): ReactElement => {
  return (
    <button
      className={`${notification_count > 0 ? "py-2.5 px-3" : "p-2.5"} ${
        mobile ? "flex md:hidden" : "hidden md:flex"
      } bg-primary-yellow rounded-xl items-center justify-center gap-2 ${position}`}
      onClick={onClick}
    >
      <AiFillBell className="text-[1.3rem]" />
      {notification_count > 0 && (
        <span
          className={`flex items-center justify-center bg-secondary-yellow-1 rounded-full text-xs font-semibold ${
            notification_count < 10 ? "px-2.5 py-1" : "px-1.5 py-1"
          }`}
        >
          {notification_count > 99 ? "99+" : notification_count}
        </span>
      )}
    </button>
  );
};

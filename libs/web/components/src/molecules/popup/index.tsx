import { FC, ReactElement } from "react";
import { TPopUpProps } from "./type";
import { motion } from "framer-motion";

export const PopUp: FC<TPopUpProps> = ({
  header,
  children,
  className,
  position,
  showPopUp = false,
}): ReactElement => {
  return (
    <motion.section
      style={{
        x: 80,
      }}
      animate={{
        x: showPopUp ? [80, 0] : [0, 80],
      }}
      className={`${
        showPopUp ? "flex" : "hidden"
      } w-[60vw] sm:w-[20rem] lg:w-[23rem] flex-col justify-center items-center h-60 z-50 ${position} bg-primary-white transition-transform rounded-lg shadow-md duration-0`}
    >
      {/* header */}
      <section className="w-full h-16 bg-primary-green rounded-t-lg">{header}</section>
      <section className={`${className} h-full w-full`}>{children}</section>
    </motion.section>
  );
};

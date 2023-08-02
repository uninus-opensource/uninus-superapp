import { FC, ReactElement } from "react";
import { TRectangleProps } from "./type";

export const Rectangle: FC<TRectangleProps> = ({ fill, className }): ReactElement => {
  return (
    <svg
      width="164"
      height="245"
      viewBox="0 0 164 245"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${fill} ${className}`}
    >
      <rect width="164" height="245" rx="12" />
    </svg>
  );
};

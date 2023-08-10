import { ReactNode } from "react";

export type TPopUpProps = {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
  position?: string;
  showPopUp?: boolean;
};

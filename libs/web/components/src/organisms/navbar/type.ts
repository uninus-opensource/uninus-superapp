import { ReactNode } from "react";

export type TNavbarList = {
  item: string | ReactNode;
  link?: string;
  state?: () => void;
  state2?: () => void;
};

export type TDropDownList = {
  item: string;
  link: string;
};

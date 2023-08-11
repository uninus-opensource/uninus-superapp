import { ReactNode } from "react";

export type NavbarList = {
  item: string | ReactNode;
  link?: string;
  state?: () => void;
  state2?: () => void;
};

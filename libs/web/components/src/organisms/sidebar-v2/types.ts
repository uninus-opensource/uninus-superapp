import { ReactNode } from "react";

export type TSidebarV2 = {
  title?: string;
  onLogout: () => void;
  sideList: Array<{
    name?: string;
    link?: string;
    icon?: ReactNode;
  }>;
};

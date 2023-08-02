import { ReactNode } from "react";

export type TSidebarProps = {
  showSidebar: boolean;
  closeSidebar: () => void;
  children?: ReactNode;
};

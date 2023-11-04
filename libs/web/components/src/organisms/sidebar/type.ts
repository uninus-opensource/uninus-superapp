import { ReactNode } from "react";

export type TSideBarProps = {
  profilePicture?: string;
  profileName: string;
  profileEmail: string;
  onLogout?: () => void;
  moduleName?: string;
  sideList?: TSideBarList[];
};
export type TSideBarList = {
  label: string;
  link?: string;
  icon: ReactNode;
  disabledStatus?: boolean;
  sideDropdown?: boolean;
  isDropdown?: boolean;
  sideDropdownList?: TSideBarDropdown[];
  onClick?: () => void;
};

export type TSideBarDropdown = {
  label: string;
  link: string;
  icon?: ReactNode;
  disabledStatus?: boolean;
};

import { ReactNode } from 'react';

export type TSideBarProps = {
  profilePicture?: string;
  profileName: string;
  profileEmail: string;
  onLogout?: () => void;
  sideList?: TSideBarList[];
};
export type TSideBarList = {
  label: string;
  link: string;
  icon: ReactNode;
};

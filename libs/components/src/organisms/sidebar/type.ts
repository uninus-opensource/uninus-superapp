export type TSideBarProps = {
  profilePicture?: string;
  profileName: string;
  profileEmail: string;
  onLogout?: () => void;
};
export type TSideBarList = {
  label: string;
  link: string;
  icon?: JSX.Element;
};

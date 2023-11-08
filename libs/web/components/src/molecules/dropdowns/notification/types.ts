export type TNotificationDropdownProps = {
  showNotification: boolean;
  closeNotification: () => void;
};

export type TAllNews = {
  news: string;
  time: number | Date;
};

export type TProfileDropdown = {
  showProfile: boolean;
  notification_counts: number;
};

export type TUserData = {
  name: string;
  nim: string;
};

export type TInfoProfile = Array<{
  name: string;
  description: string;
}>;

export type TKeteranganLulus = "Aktif" | "Cuti" | "Tidak Aktif" | "Lulus";

export type TProfileDropdown = {
  showProfile: boolean;
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

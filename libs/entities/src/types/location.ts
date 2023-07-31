export type TProvinceResponse = {
  province: Array<{
    id: number;
    name: string;
  }>;
};

export type TCityRequest = {
  id: string;
};

export type TCityResponse = {
  city: Array<{
    id: number;
    name: string;
  }>;
};

export type TSubDistrictRequest = {
  id: string;
};

export type TSubDistrictResponse = {
  sub_district: Array<{
    id: number;
    name: string;
  }>;
};

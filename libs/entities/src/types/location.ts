export interface IProvinceRequest {
  search: string;
}

export type TProvinceResponse = {
  province: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICityRequest extends IProvinceRequest {
  province_id: string;
}

export type TCityResponse = {
  city: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISubDistrictRequest extends IProvinceRequest {
  city_id: string;
}

export type TSubDistrictResponse = {
  sub_district: Array<{
    id: number;
    name: string;
  }>;
};

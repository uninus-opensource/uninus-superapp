export type TLocationRequest = {
  province: string;
  city: string;
};

export type TQueryOptionLocation = {
  where?: {
    id?: number;
  };
  include?: {
    cities?:
      | boolean
      | {
          where: {
            id: number;
          };
          include: {
            sub_district: boolean;
          };
        };
  };
};

export type TLocationResponse = {
  province: Array<{
    id: number;
    name: string;
    cities?: Array<{
      id: number;
      name: string;
      province_id: number;
      sub_district?: Array<{
        id: number;
        name: string;
        city_id: number;
      }>;
    }>;
  }>;
};

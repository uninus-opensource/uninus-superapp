export type TLocationRequest = {
  province: string;
  city: string;
};

export type TIncludeCities = {
  where: {
    id: number;
  };
  include: {
    sub_district: boolean;
  };
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

export type TUsersPaginationParams = {
  page?: number;
  per_page?: number;
  search?: string;
  filter_by?: string;
  order_by?: "asc" | "desc";
};

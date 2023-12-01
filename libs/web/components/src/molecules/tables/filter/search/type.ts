import { ChangeEventHandler } from "react";

export type TSearch = {
  placeholder?: string;
  handleSearch?: ChangeEventHandler<HTMLInputElement>;
};

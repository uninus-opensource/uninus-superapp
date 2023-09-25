import { atom } from "recoil";
import { TDataAkun } from "./types";
export const filterActionUser = atom<TDataAkun>({
  key: "flter-action",
  default: {
    id: "",
    fullname: "",
    role: { id: 0, name: "" },
    phone_number: "",
    email: "",
    password: "",
  },
});

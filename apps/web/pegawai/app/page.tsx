import { ReactElement } from "react";
import { NextPage } from "next";
import { Metadata } from "next";
import { LoginManajemenPegawaiModule } from "@uninus/web/modules";

export const metadata: Metadata = {
  title: "Login | Manajemen Pegawai",
  description: "Manajemen Pegawai Login Page",
};

const ManajemenPegawaiPage: NextPage = (): ReactElement => (
  <LoginManajemenPegawaiModule key="auth-manajemen-pegawai" />
);
export default ManajemenPegawaiPage;

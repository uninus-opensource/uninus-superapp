"use client";
import { Button, SearchInput } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import { TableDataMahasiswaTataUsaha } from "./tabel";
import { FilterOutlined } from "@ant-design/icons";

export const DashboardDataMahasiswaTataUsahaModule: FC = (): ReactElement => {
  return (
    <section className="flex flex-col w-full h-auto">
      {/* header */}
      <div className="pl-5 flex flex-col justify-center w-full h-[4.5rem]">
        <h1 className="text-[1.5rem] lg:text-[1.2rem] text-grayscale-5 font-medium">
          TU <span className="text-secondary-green-4">/ Data Mahasiswa</span>
        </h1>
        <h1 className="text-[1.5rem] lg:text-[1.2rem] text-secondary-green-4 font-bold">
          Data Mahasiswa
        </h1>
      </div>

      {/* Filter */}
      <div className="w-full flex flex-wrap flex-col md:flex-row md:justify-center mt-5 gap-5 md:gap-4 xl:gap-3 lg:mt-0 items-center">
        <div className="flex w-[90%] md:w-[39%] xl:w-[42%] justify-center items-center">
          <div className="w-[35%] md:w-[27%] xl:w-[20%] flex md:justify-center">
            <h2 className="text-lg md:text-[0.7rem] font-bold">Nama / Nim</h2>
          </div>
          <div className="w-[65%] md:w-[73%] xl:w-[80%]">
            <SearchInput placeholder="Cari Nama atau NIM" width="w-full" />
          </div>
        </div>
        <div className="flex w-[90%] md:w-[39%] xl:w-[42%] justify-center items-center">
          <div className="w-[35%] md:w-[27%] xl:w-[20%] flex md:justify-center">
            <h2 className="text-lg md:text-[0.7rem] font-bold">Dosen PA</h2>
          </div>
          <div className="w-[65%] md:w-[73%] xl:w-[80%]">
            <SearchInput placeholder="Cari Nama, NIDN Dosen PA" width="w-full" />
          </div>
        </div>

        <div className="w-full md:w-[13%] xl:w-[10%] flex justify-center items-center">
          <div className="w-[90%]">
            <Button
              variant="custom"
              styling="bg-primary-green text-primary-white w-full rounded-md"
            >
              <div className="flex justify-center items-center gap-2 w-full">
                <FilterOutlined className="text-primary-white" />
                <h3>Filter</h3>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full h-auto mt-5 flex justify-center">
        <div className="w-[95%] rounded-md h-auto">
          <TableDataMahasiswaTataUsaha />
        </div>
      </div>
    </section>
  );
};

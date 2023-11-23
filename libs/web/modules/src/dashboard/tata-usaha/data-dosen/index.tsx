"use client";
import { Button, SearchInput } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { TableDataDosenTataUsaha } from "./table";

export const DashboardDataDosenTataUsahaModule: FC = (): ReactElement => {
  return (
    <section className="flex flex-col w-full h-auto">
      {/* header */}
      <div className="pl-5 flex flex-col justify-center w-full h-[4.5rem]">
        <h1 className="text-[1.5rem] lg:text-[1.2rem] text-grayscale-5 font-medium">
          TU <span className="text-secondary-green-4">/ Data Dosen</span>
        </h1>
        <h1 className="text-[1.5rem] lg:text-[1.2rem] text-secondary-green-4 font-bold">
          Data Dosen
        </h1>
      </div>

      {/* Filter */}
      <div className="w-full flex flex-wrap flex-col md:flex-row md:justify-center mt-5 gap-5 md:gap-4 xl:gap-3 lg:mt-0 items-center">
        <div className="flex w-[90%] md:w-[82%] xl:w-[87%] justify-center items-center">
          <div className="w-[20%] flex md:justify-center">
            <h2 className="text-[0.8rem] md:text-[0.7rem] xl:text-base font-bold">
              Nama / NIP / NIDN
            </h2>
          </div>
          <div className="w-[75%] ml-[5%] md:w-[80%] md:ml-0 xl:w-[80%]">
            <SearchInput placeholder="Cari Nama, NIP atau NIDN" width="w-full" />
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
          <TableDataDosenTataUsaha />
        </div>
      </div>
    </section>
  );
};

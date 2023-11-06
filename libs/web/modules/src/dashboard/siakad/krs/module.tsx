"use client";
import { FC, ReactElement, useState } from "react";
import { cardData } from "./store";
import { Button, SelectOption } from "@uninus/web/components";
import { AiOutlineForm, AiOutlineDownload } from "react-icons/ai";
import { FieldValues, useForm } from "react-hook-form";
import { Table } from "./table";

export const MenuKrsSiakad: FC = (): ReactElement => {
  const [tabs, setTabs] = useState<"perwalian" | "krs" | "perbaikan">("krs");

  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });

  return (
    <section className="w-full h-auto md:h-screen flex flex-col">
      {/* Header */}
      <div className="ml-7 mt-5">
        <h1 className="text-[1.6rem] capitalize font-bold text-primary-black">
          kartu rencana studi
        </h1>
      </div>

      {/* Tabs */}
      <div className="w-full mt-3 flex justify-center items-center md:justify-normal hover:cursor-pointer">
        <div className="w-[85%] md:w-[50%] lg:w-[380px] md:ml-[3.5%] xl:ml-[3%] rounded-lg border border-grayscale-3 flex">
          <div
            className={`w-1/3 grid place-items-center border-l py-2 lg:py-[0.6rem] rounded-l-lg ${
              tabs === "perwalian"
                ? "bg-primary-green border-primary-green text-primary-white"
                : "border-grayscale-3 text-grayscale-3"
            }`}
            onClick={() => {
              setTabs("perwalian");
            }}
          >
            <h2 className="text-[0.8rem] lg:text-[0.9rem] capitalize">perwalian</h2>
          </div>
          <div
            className={`w-1/3 grid place-items-center border-l border-grayscale-3 py-2 lg:py-[0.6rem] ${
              tabs === "krs"
                ? "bg-primary-green border-primary-green text-primary-white"
                : "border-grayscale-3 text-grayscale-3"
            }`}
            onClick={() => {
              setTabs("krs");
            }}
          >
            <h2 className="text-[0.8rem] lg:text-[0.9rem] uppercase">krs</h2>
          </div>
          <div
            className={`w-1/3 grid place-items-center border-l border-grayscale-3 py-2 lg:py-[0.6rem] rounded-r-lg ${
              tabs === "perbaikan"
                ? "bg-primary-green border-primary-green text-primary-white"
                : "border-grayscale-3 text-grayscale-3"
            }`}
            onClick={() => {
              setTabs("perbaikan");
            }}
          >
            <h2 className="text-[0.8rem] lg:text-[0.9rem] capitalize">perbaikan</h2>
          </div>
        </div>
      </div>

      {/* Card section */}
      <div className="w-full flex flex-col md:flex-row md:flex-wrap items-center md:justify-center lg:items-center mt-5 gap-2 md:gap-3">
        {cardData.map((items, index) => (
          <div
            key={index}
            className={`w-5/6 ${
              items.heading1 === "Dosen PA/Wali"
                ? "md:w-[93%] lg:w-[39%]"
                : "md:w-[30%] lg:w-[17.5%]"
            } h-auto shadow-card p-[18px] lg:p-3 lg:py-8 flex gap-2 items-center rounded-xl`}
          >
            <div className={`${items.class} w-1 h-10 lg:h-12 rounded-md ml-3 lg:ml-2`}></div>
            <div className="flex flex-col ml-2">
              <h2 className="text-[0.9rem] lg:text-[0.55rem] xl:text-[0.8rem] text-primary-black font-semibold">
                {items.heading1}
              </h2>
              <h2 className="text-[1.3rem] lg:text-[1rem] xl:text-[1.2rem] text-primary-black font-bold">
                {items.heading2}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="w-full flex flex-col mt-7 z-10">
        <div className="w-full md:w-[96%] flex flex-col md:flex-row justify-between gap-5">
          <div className="w-[85%] md:w-[25%] lg:w-[200px] xl:w-[175px] ml-8">
            <Button variant="custom" styling="border border-grayscale-4 shadow-md w-full">
              <div className="flex gap-2 justify-center items-center">
                <AiOutlineForm className="text-[1.5rem] text-grayscale-6" />
                <h3 className="capitalize text-[0.7rem] text-grayscale-6">ambil perkuliahan</h3>
              </div>
            </Button>
          </div>

          <div className="w-[85%] md:w-[40%] lg:w-[250px] xl:w-[300px] ml-8 flex justify-between">
            <div className="w-[47%] lg:w-[50%] xl:w-[60%]">
              <SelectOption
                name="year"
                options={[
                  {
                    value: "1",
                    label: "2023/2024",
                  },
                  {
                    value: "2",
                    label: "2022/2023",
                  },
                  {
                    value: "3",
                    label: "2021/2022",
                  },
                ]}
                placeholder="2023/2024"
                required={false}
                control={control}
                className="w-full"
                isClearable={true}
              />
            </div>
            <div className="w-[47%] lg:w-[100px]">
              <Button variant="custom" styling="bg-primary-green shadow-md w-full">
                <div className="flex gap-2 justify-center items-center">
                  <AiOutlineDownload className="text-[1.5rem] text-primary-white" />
                  <h3 className="capitalize text-[0.7rem] text-primary-white">unduh</h3>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full flex justify-center items-center mt-5">
        <div className="w-[95%] rounded-md">
          <Table />
        </div>
      </div>
    </section>
  );
};

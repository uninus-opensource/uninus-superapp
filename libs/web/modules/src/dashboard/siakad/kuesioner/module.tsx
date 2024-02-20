"use client";
import { FC, ReactElement, useState } from "react";
import { SelectOption } from "@uninus/web/components";
import { FieldValues, useForm } from "react-hook-form";
import { TableKuesionerSiakad } from "./table";



export const KuesionerModuleSiakad: FC = (): ReactElement => {
  const [tabs, setTabs] = useState<"evaluasi-dosen" | "kuesioner-umum" >("evaluasi-dosen");

  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });

  return (
    <section className="w-full h-auto md:h-screen flex flex-col">
      {/* Header */}
      <div className="ml-7 mt-5">
        <h1 className="text-[1.6rem] capitalize font-bold text-primary-black">
          Kuesioner
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex w-full mt-3 justify-between items-center hover:cursor-pointer px-6">
        <div className="w-[85%] md:w-[50%] lg:w-[380px] rounded-lg border border-grayscale-3 flex">
          <div
            className={`w-1/2 grid place-items-center border-l py-2 lg:py-[0.6rem] rounded-l-lg ${
              tabs === "evaluasi-dosen"
                ? "bg-primary-green border-primary-green text-primary-white"
                : "border-grayscale-3 text-grayscale-3"
            }`}
            onClick={() => {
              setTabs("evaluasi-dosen");
            }}
          >
            <h2 className="text-[0.8rem] lg:text-[0.9rem] capitalize">Evaluasi Dosen</h2>
          </div>
          <div
            className={`w-1/2 grid place-items-center border-l border-grayscale-3 py-2 lg:py-[0.6rem] ${
              tabs === "kuesioner-umum"
                ? "bg-primary-green border-primary-green text-primary-white"
                : "border-grayscale-3 text-grayscale-3"
            }`}
            onClick={() => {
              setTabs("kuesioner-umum");
            }}
          >
            <h2 className="text-[0.8rem] lg:text-[0.9rem]">Kuesioner Umum</h2>
          </div>
        </div>
        
        <div className="flex gap-3">
            <div className="w-[300px] bg-red-9 text-conditional-error p-2 rounded-md">
            Pengisian Ditutup
            </div>
            <div className="w-full z-40">
              <SelectOption
                name="sems"
                options={[
                  {
                    value: "1",
                    label: "Semester 1",
                  },
                  {
                    value: "2",
                    label: "Semester 2",
                  },
                  {
                    value: "3",
                    label: "Semester 3",
                  },
                ]}
                placeholder="Semester"
                required={false}
                control={control}
                className="w-full"
                isClearable={true}
                selectColor="white"
                optionColor="white"
                isBordered={true}
              />
            </div>
        </div>
      </div>
      <div className="p-6">
      <TableKuesionerSiakad />
      </div>
    </section>
  );
};

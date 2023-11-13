import { SelectOption } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Nilai } from "./store";

export const Grades: FC = (): ReactElement => {
  const { control } = useForm<FieldValues>({
    defaultValues: {},
  });
  return (
    <div className="w-full flex-col flex bg-primary-white lg:w-full xl:w-[38vw] gap-y-4 h-fit rounded-md shadow-md p-6">
      <div className="flex flex-row justify-between items-center border-b-grayscale-2 border-b-[1px] pb-5">
        <h1 className="text-lg lg:text-xl font-bold text-secondary-green-4 text-left">
          Mata Kuliah Tidak Lulus
        </h1>
        <div className="w-[35%]">
          <SelectOption
            name="rekap"
            options={[
              {
                value: "1",
                label: "Semua",
              },
              {
                value: "2",
                label: "Semester 1",
              },
              {
                value: "3",
                label: "Semester 2",
              },
              {
                value: "4",
                label: "Semester 3",
              },
              {
                value: "5",
                label: "Semester 4",
              },

              {
                value: "6",
                label: "Semester 5",
              },
            ]}
            placeholder="Semua"
            required={false}
            control={control}
            className="w-full"
            isClearable={true}
          />
        </div>
      </div>
      <div className="flex flex-col gap-9">
        {Nilai.map((x, i) => (
          <div className="flex justify-between flex-row text-left" key={i}>
            <h1 className="text-xl font-medium text-grayscale-9">{x.matkul}</h1>
            <h1 className="text-xl text-red-8 font-medium">{x.nilai}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

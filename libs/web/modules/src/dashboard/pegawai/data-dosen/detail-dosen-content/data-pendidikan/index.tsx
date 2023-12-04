import { Button, SelectOption } from "@uninus/web/components";
import { FC, Fragment, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillFileText, AiOutlinePlus } from "react-icons/ai";

export const DataPendidikaniDosen: FC = (): ReactElement => {
  const [formNumber, setFormNumber] = useState<number>(1);

  const { control } = useForm({
    mode: "all",
  });

  const selectFields: { name: string; label: string }[] = [
    {
      name: "jurusan",
      label: "Asal Pendidikan",
    },
    {
      name: "tahun_lulus",
      label: "Tahun Lulus",
    },
    {
      name: "asal_universitas",
      label: "Asal Perguruan Tinggi",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center overflow-auto px-6 pt-3 pb-14">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold xl:text-2xl text-xl">Data Pendidikan</h1>
        <Button
          size="sm"
          variant="filled"
          height="xl:h-10 h-9"
          onClick={() => setFormNumber((prev) => prev + 1)}
          disabled={formNumber === 3}
        >
          <AiOutlinePlus className="mr-2 xl:text-lg text-base" />
          Tambah Data Pendidikan
        </Button>
      </div>

      <div className="w-full flex flex-wrap gap-x-28">
        {Array.from({ length: formNumber }, (_, index) => (
          <Fragment>
            <div key={index} className="grid grid-cols-2 py-10 gap-y-6 gap-x-28">
              {selectFields.map((field, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="font-bold xl:text-lg text-base">{field.label}</h3>
                  <SelectOption
                    name={field.name}
                    options={[]}
                    isClearable={true}
                    isSearchable={false}
                    control={control}
                    status={"error"}
                    placeholder="Strata 3"
                    labelClassName="font-bold text-xs py-2"
                    className="w-full md:w-[33vw] lg:w-[23rem]"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5 mt-2">
                <h3 className="font-bold xl:text-lg text-base">Ijazah Pendidikan</h3>
                <div className="flex items-center w-full md:w-[33vw] lg:w-[23rem] h-10 px-2 rounded-md bg-grayscale-2 bg-opacity-30">
                  <button className="flex items-center">
                    <AiFillFileText className="text-2xl text-primary-green" />
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-2 w-full text-grayscale-2" />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

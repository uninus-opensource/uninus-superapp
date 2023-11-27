import { SelectOption, TextField } from "@uninus/web/components";
import Image from "next/image";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { textFieldDataDiriDosen } from "./store";

export const DataDiriDosen: FC = (): ReactElement => {
  const { control } = useForm({
    mode: "all",
  });

  const selectOptionDataDiriDosen = [
    {
      name: "gender_id",
      label: "Jenis Kelamin",
    },
    {
      name: "religion_id",
      label: "Agama",
    },
    {
      name: "marital_status_id",
      label: "Status Perkawinan",
    },
    {
      name: "citizenship_id",
      label: "Kewarganegaraan",
    },
    {
      name: "country_id",
      label: "Asal Negara",
    },
    {
      name: "province_id",
      label: "Provinsi",
    },
    {
      name: "city_id",
      label: "Kota",
    },
    {
      name: "district_id",
      label: "Kecamatan",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center overflow-auto pb-14">
      <figure className="flex flex-col items-center">
        <Image
          className="w-[150px] h-[150px] bg-cover object-cover rounded-full"
          src={"/illustrations/dummy-avatar.webp"}
          alt="profile picture"
          quality={100}
          width={500}
          height={500}
          priority={true}
        />
      </figure>

      <div className="w-full grid grid-cols-2 gap-4 justify-items-center mt-8">
        {textFieldDataDiriDosen.map((data, idx) => (
          <TextField
            inputHeight="h-9"
            key={idx}
            name={data.name}
            variant="sm"
            type="text"
            label={data.label}
            labelclassname="font-semibold"
            inputWidth="w-70% lg:w-[27vw] text-base md:w-[33vw] "
            control={control}
          />
        ))}
      </div>

      <div className="w-full grid grid-cols-2 gap-4 justify-items-center">
        <TextField
          inputHeight="h-9"
          name="birth_place"
          variant="sm"
          type="text"
          label="Tempat Lahir"
          labelclassname="font-semibold"
          inputWidth="w-70% lg:w-[27vw] text-base md:w-[33vw] "
          control={control}
        />
        <TextField
          inputHeight="h-9"
          name="birth_date"
          variant="sm"
          type="date"
          label="Tanggal Lahir"
          labelclassname="font-semibold"
          inputWidth="w-70% lg:w-[27vw] text-base md:w-[33vw]"
          control={control}
        />
      </div>

      <div className="w-full h-full grid grid-cols-2 gap-4 justify-items-center">
        {selectOptionDataDiriDosen.map((data, idx) => (
          <SelectOption
            key={idx}
            labels={data.label}
            name={data.name}
            labelClassName="font-bold text-xs py-2"
            options={[]}
            isClearable={true}
            isSearchable={false}
            control={control}
            status={"error"}
            className="w-full md:w-[33vw] lg:w-[27vw]"
          />
        ))}
      </div>

      <div className="w-full h-full flex justify-center items-center mt-5">
        <TextField
          name="address"
          variant="sm"
          type="text"
          labelclassname="text-xl font-semibold"
          label="Alamat Domisili"
          placeholder="Masukan Alamat Lengkap Anda"
          control={control}
          required
          isTextArea
          textAreaCols={30}
          inputHeight="h-20"
          inputWidth="md:w-[80vw] lg:w-[55vw] w-[70vw]"
          className="resize-none bg-grayscale-2  "
        />
      </div>
    </section>
  );
};

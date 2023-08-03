import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button } from "@uninus/web/components";
import { defaultValuesBiodata } from "../../store";
import { useForm, FieldValues } from "react-hook-form";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import { useBiodataUpdate } from "../../hooks";

export const DataPendidikanSection: FC = (): ReactElement => {
  const { control, handleSubmit, watch, setValue } = useForm<FieldValues>({
    mode: "all",
    defaultValues: { ...defaultValuesBiodata },
  });

  const [locationMeta, setLocationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });

  const { data: getProvincies } = useProvinceGet(locationMeta);

  const provinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );

  const { data: getCity } = useCityGet({
    province_id: watch("province"),
    search: "",
  });

  const cityOptions = useMemo(
    () =>
      getCity?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCity?.city],
  );

  const { data: getSubdistrict } = useSubdistrictGet({
    city_id: watch("city"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrict?.sub_district?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrict?.sub_district],
  );

  useEffect(() => {
    setValue("city", null);
  }, [watch("province")]);

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    try {
      mutate({
        ...data,
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Data Pendidikan"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit}>
        <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <SelectOption
            name="school_type"
            labels="Jenis Pendidikan Asal"
            placeholder="Jenis Pendidikan"
            className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            options={[
              {
                label: "SMA",
                value: "SMA",
              },
              {
                label: "SMK",
                value: "SMK",
              },
              {
                label: "Madrasah",
                value: "MA",
              },
            ]}
            isSearchable={false}
            isClearable={true}
            control={control}
            isMulti={false}
          />
          <SelectOption
            name="graduation_year"
            labels="Tahun Lulus"
            placeholder="Tahun Lulus"
            options={[
              {
                label: "2020",
                value: "2020",
              },
              {
                label: "2021",
                value: "2021",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
          />
          <SelectOption
            name="school_major"
            labels="Jurusan Pendidikan Asal"
            placeholder="Jurusan Pendidikan"
            options={[
              {
                label: "IPA",
                value: "MIPA",
              },
              {
                label: "IPS",
                value: "IPS",
              },
              {
                label: "Keagamaan",
                value: "Agama",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
          />
        </section>

        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <TextField
            inputHeight="h-10"
            name="npsn"
            variant="sm"
            type="text"
            labelclassname="text-sm font-semibold"
            label="NPSN"
            placeholder="Masukan NPSN"
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
            control={control}
          />
          <SelectOption
            name="school_name"
            labels="Nama Sekolah Asal"
            placeholder="Masukan Sekolah Asal"
            options={[
              {
                label: "SMAN 4 Bandung",
                value: "SMAN 4 Bandung",
              },
              {
                label: "SMAN 5 Bandung",
                value: "SMAN 5 Bandung",
              },
              {
                label: "SMK 1 Bandung",
                value: "SMAN 1 Bandung",
              },
            ]}
            className="rounded-md text-primary-black w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>

        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold"
            options={provinceOptions || []}
            placeholder="Provinsi"
            isSearchable={true}
            name="school_province"
            isClearable={true}
            control={control}
            isMulti={false}
          />
          <SelectOption
            labels="City"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold"
            options={cityOptions || []}
            placeholder="Kota/Kabupaten"
            isSearchable={true}
            name="school_city"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={!watch("province")}
          />
          <SelectOption
            labels="Kecamatan"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold"
            options={subDistrictOptions || []}
            placeholder="Kecamatan"
            isSearchable={true}
            name="school_subdistrict"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={!watch("city")}
          />
        </section>

        <section className="flex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <div className="col-span-3">
            <TextField
              name="school_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Pendidikan Asal"
              control={control}
              isTextArea
              textAreaRow={5}
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="w-[70vw] lg:w-[40vw] md:w-[50vw] md:mr-5"
              className="resize-none bg-grayscale-2  "
            />
          </div>
          <div className="col-end-5">
            <TextField
              inputHeight="h-10"
              name="school_postal_code"
              variant="md"
              type="text"
              labelclassname="text-sm "
              label="Kode Pos"
              inputWidth="w-26 text-base"
              control={control}
            />
          </div>
        </section>
        <div className="flex w-full justify-end py-4">
          <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15%">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};

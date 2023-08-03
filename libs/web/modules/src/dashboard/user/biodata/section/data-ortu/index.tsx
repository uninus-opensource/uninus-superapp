import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button, CheckBox } from "@uninus/web/components";
import { defaultValuesBiodata } from "../../store";
import { useForm, FieldValues } from "react-hook-form";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import { useBiodataUpdate } from "../../hooks";

export const DataOrtuSection: FC = (): ReactElement => {
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
      title="Data Orang Tua "
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] text-left"
    >
      <form onSubmit={onSubmit}>
        {/* Ayah */}
        <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Profil Ayah
        </h1>

        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <TextField
            inputHeight="h-10"
            name="father_name"
            variant="sm"
            type="text"
            required
            placeholder="Nama Lengkap Ayah Kandung"
            labelclassname="text-sm font-semibold"
            label="Nama Ayah"
            inputWidth="w-70% lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
            control={control}
          />
          <SelectOption
            name="school_subdistrict"
            labels="Status Ayah"
            placeholder="Status Ayah"
            options={[
              {
                label: "Meninggal",
                value: "Meninggal",
              },
              {
                label: "Hidup",
                value: "Hidup",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="father_education"
            labels="Pendidikan Terahir Ayah"
            placeholder="Pendidikan"
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
                label: "Stara S1",
                value: "S1",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="father_profecy"
            labels="Pekerjaan Ayah"
            placeholder="Pilih Pekerjaan"
            options={[
              {
                label: "PNS",
                value: "Guru",
              },
              {
                label: "Buruh",
                value: "Berdagang",
              },
              {
                label: "Polri",
                value: "Polisi",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="father_income"
            labels="Pendapatan Ayah ( Per Bulan )"
            placeholder="Pilih Pendapatan"
            options={[
              {
                value: "Rendah",
                label: "0 - 1.200.000",
              },
              {
                value: "Menengah",
                label: "1.200.000 - 3.200.000",
              },
              {
                value: "Tinggi",
                label: "3.200.000 - 6.000.000",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>
        {/* Ibu */}
        <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Profil Ibu
        </h1>
        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <TextField
            inputHeight="h-10"
            name="mother_name"
            variant="sm"
            type="text"
            required
            placeholder="Nama Lengkap Ibu Kandung"
            labelclassname="text-sm font-semibold"
            label="Nama Ibu"
            inputWidth="w-70% lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
            control={control}
          />
          <SelectOption
            name="status_mother"
            labels="Status Ibu"
            placeholder="Status Ibu"
            options={[
              {
                label: "Meninggal",
                value: "Meninggal",
              },
              {
                label: "Hidup",
                value: "Hidup",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="mother_education"
            labels="Pendidikan Terahir Ibu"
            placeholder="Pendidikan"
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
                label: "Stara S1",
                value: "S1",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="mother_profecy"
            labels="Pekerjaan Ibu"
            placeholder="Pilih Pekerjaan"
            options={[
              {
                label: "PNS",
                value: "Guru",
              },
              {
                label: "Buruh",
                value: "Berdagang",
              },
              {
                label: "IRT",
                value: "IRT",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="mother_income"
            labels="Pendapatan Ibu ( Per Bulan )"
            placeholder="Pilih Pendapatan"
            options={[
              {
                value: "Rendah",
                label: "0 - 1.200.000",
              },
              {
                value: "Menengah",
                label: "1.200.000 - 3.200.000",
              },
              {
                value: "Tinggi",
                label: "3.200.000 - 6.000.000",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>
        {/* Parent Address */}
        <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Alamat Orang Tua
        </h1>
        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold"
            options={provinceOptions || []}
            placeholder="Provinsi"
            isSearchable={true}
            name="address_province"
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
            name="adress_city"
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
            name="adress_subdistrict"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={!watch("city")}
          />
        </section>
        <section className="lex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <div className="col-span-3">
            <TextField
              name="parent_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Domisili"
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
              name="parent_postal_code"
              variant="md"
              type="text"
              labelclassname="text-sm "
              label="Kode Pos"
              inputWidth="w-26 text-base"
              control={control}
            />
          </div>
          <div className="col-span-4">
            <CheckBox
              name="parent_address"
              control={control}
              label="Alamat Sama Dengan Pendaftar"
              variant="primary"
              size="md"
            />
          </div>
        </section>

        <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Profil Wali
        </h1>
        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <TextField
            inputHeight="h-10"
            name="guardian_name"
            placeholder="Nama Lengkap Wali"
            variant="sm"
            type="text"
            labelclassname="text-sm font-semibold"
            label="Nama Wali"
            inputWidth="w-70% lg:w-[26vw] max-w-20% xl:w-[25vw] md:w-[33vw]"
            control={control}
          />
          <SelectOption
            name="status_gardian"
            labels="Status Wali"
            placeholder="Status Wali"
            options={[
              {
                label: "Meninggal",
                value: "Meninggal",
              },
              {
                label: "Hidup",
                value: "Hidup",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="guardian_education"
            labels="Pendidikan Terahir Wali"
            placeholder="Pendidikan"
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
                label: "Stara S1",
                value: "S1",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[12vw] md:w-[16vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="guardian_profecy"
            labels="Pekerjaan Wali"
            placeholder="Pilih Pekerjaan"
            options={[
              {
                label: "PNS",
                value: "Guru",
              },
              {
                label: "Buruh",
                value: "Berdagang",
              },
              {
                label: "IRT",
                value: "IRT",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="guardian_income"
            labels="Pendapatan Wali ( Per Bulan )"
            placeholder="Pilih Pendapatan"
            options={[
              {
                value: "Rendah",
                label: "0 - 1.200.000",
              },
              {
                value: "Menengah",
                label: "1.200.000 - 3.200.000",
              },
              {
                value: "Tinggi",
                label: "3.200.000 - 6.000.000",
              },
            ]}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>
        <h1 className="font-bold text-xl mt-3  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10">
          Alamat Wali
        </h1>
        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold"
            options={provinceOptions || []}
            placeholder="Provinsi"
            isSearchable={true}
            name="address2_province"
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
            name="adress2_city"
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
            name="adress2_subdistrict"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={!watch("city")}
          />
        </section>
        <section className="lex lg:flex-row flex-col w-[70vw] gap-x-1 justify-between items-start  lg:flex lg:justify-between lg:items-start mt-2 gap-y-4 lg:mt-6 lg:w-55% md:flex md:flex-wrap md:w-[70vw] md:justify-between">
          <TextField
            name="guardian_address"
            variant="sm"
            type="text"
            labelclassname="text-xl font-semibold"
            label="Alamat Wali"
            control={control}
            isTextArea
            textAreaRow={5}
            textAreaCols={30}
            inputHeight="h-20"
            inputWidth="w-[70vw] lg:w-[40vw] md:w-[50vw] md:mr-5"
            className="resize-none bg-grayscale-2  "
          />
          <div className="col-end-5">
            <TextField
              inputHeight="h-10"
              name="guardian_postal_code"
              variant="md"
              type="text"
              labelclassname="text-sm "
              label="Kode Pos"
              inputWidth="w-26 text-base"
              control={control}
            />
          </div>
          <div className="col-span-4">
            <CheckBox
              name="guardian_address"
              control={control}
              label="Alamat Sama Dengan Pendaftar"
              variant="primary"
              size="md"
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

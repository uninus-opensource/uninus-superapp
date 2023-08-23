import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button, CheckBox } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import { useBiodataUpdate } from "../../hooks";
import { useOccupationGet, useSalaryGet } from "./hooks";

export const DataOrtuSection: FC = (): ReactElement => {
  const { control, handleSubmit, watch, setValue } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
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

  const { data: getCityParent } = useCityGet({
    province_id: watch("adress_province_parent"),
    search: "",
  });
  const { data: getCityGuard } = useCityGet({
    province_id: watch("adress_province_guard"),
    search: "",
  });

  const cityOptionsParent = useMemo(
    () =>
      getCityParent?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCityParent?.city],
  );
  const cityOptionsGuard = useMemo(
    () =>
      getCityGuard?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCityGuard?.city],
  );

  const { data: getSubdistrictParent } = useSubdistrictGet({
    city_id: watch("adress_city_parent"),
    search: "",
  });
  const { data: getSubdistrictGuard } = useSubdistrictGet({
    city_id: watch("adress_city_guard"),
    search: "",
  });

  const subDistrictOptionsParent = useMemo(
    () =>
      getSubdistrictParent?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictParent?.subdistrict],
  );
  const subDistrictOptionsGuard = useMemo(
    () =>
      getSubdistrictGuard?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictGuard?.subdistrict],
  );

  useEffect(() => {
    setValue("city", null);
  }, [watch("address_province_parent")]);

  const [salary] = useState({
    search: "",
  });

  const { data: getSalary } = useSalaryGet(salary);

  const salaryOptions = useMemo(
    () =>
      getSalary?.salary?.map((salary) => ({
        label: salary?.name,
        value: salary?.id.toString(),
      })),
    [getSalary?.salary],
  );

  const [occupation] = useState({
    search: "",
  });

  const { data: getOccupation } = useOccupationGet(occupation);

  const occupationOptions = useMemo(
    () =>
      getOccupation?.occupation?.map((occupation) => ({
        label: occupation?.name,
        value: occupation?.id.toString(),
      })),
    [getOccupation?.occupation],
  );

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    try {
      // mutate({
      //   ...data,
      // });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Data Orang Tua "
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] text-left"
    >
      <form onSubmit={onSubmit}>
        {/* Ayah */}
        <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] place-self-start pl-4">
          Profil Ayah
        </h1>

        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
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
            required={true}
            labelClassName="font-bold text-xs py-2"
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
            labelClassName="font-bold text-xs py-2"
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
            labelClassName="font-bold text-xs py-2"
            placeholder="Pilih Pekerjaan"
            options={occupationOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="father_income"
            labels="Pendapatan Ayah ( Per Bulan )"
            labelClassName="font-bold text-xs py-2"
            placeholder="Pilih Pendapatan"
            options={salaryOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>
        {/* Ibu */}
        <h1 className="font-bold text-xl my-6  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Profil Ibu
        </h1>
        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
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
            labelClassName="font-bold text-xs py-2"
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
            labelClassName="font-bold text-xs py-2"
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
            options={occupationOptions || []}
            labelClassName="font-bold text-xs py-2"
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="mother_income"
            labels="Pendapatan Ibu ( Per Bulan )"
            labelClassName="font-bold text-xs py-2"
            placeholder="Pilih Pendapatan"
            options={salaryOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>
        {/* Parent Address */}
        <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Alamat Orang Tua
        </h1>
        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={provinceOptions || []}
            placeholder="Provinsi"
            isSearchable={true}
            name="address_province_parent"
            isClearable={true}
            control={control}
            isMulti={false}
          />
          <SelectOption
            labels="Kota/Kabupaten"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptionsParent || []}
            placeholder="Kota/Kabupaten"
            isSearchable={true}
            name="address_city_parent"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={!watch("adress_province_parent")}
          />
          <SelectOption
            labels="Kecamatan"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={subDistrictOptionsParent || []}
            placeholder="Kecamatan"
            isSearchable={true}
            name="address_subdistrict_parent"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={!watch("adress_city_parent")}
          />

          <div className="px-4 md:px-0 lg:px-0 w-full">
            <TextField
              name="parent_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Domisili"
              control={control}
              required
              isTextArea
              textAreaRow={5}
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
            />
          </div>
          <div className="w-70% md:w-26 lg:w-26">
            <TextField
              inputHeight="h-10"
              name="parent_postal_code"
              variant="md"
              required
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

        <h1 className="font-bold text-xl my-6  lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Profil Wali
        </h1>
        <section className="flex flex-wrap w-full justify-center items-start gap-x-1 lg:flex  lg:flex-wrap lg:gap-6 xl:gap-1 gap-y-4 mt-2 lg:items-center lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
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
            labelClassName="font-bold text-xs py-2"
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
            labelClassName="font-bold text-xs py-2"
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
            labelClassName="font-bold text-xs py-2"
            placeholder="Pilih Pekerjaan"
            options={occupationOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26vw] md:w-[33vw]"
            isSearchable={true}
            control={control}
            isMulti={false}
            isClearable={true}
          />
          <SelectOption
            name="guardian_income"
            labels="Pendapatan Wali ( Per Bulan )"
            labelClassName="font-bold text-xs py-2"
            placeholder="Pilih Pendapatan"
            options={salaryOptions || []}
            className=" rounded-md text-primary-black w-70% lg:w-[26.5vw] md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            isClearable={true}
          />
        </section>
        <h1 className="font-bold text-xl my-6 lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-4">
          Alamat Wali
        </h1>
        <section className="flex flex-wrap w-full justify-center items-center gap-x-1 lg:flex lg:items-start gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between">
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={provinceOptions || []}
            placeholder="Provinsi"
            isSearchable={true}
            required={false}
            name="address_province_guard"
            isClearable={true}
            control={control}
            isMulti={false}
          />
          <SelectOption
            labels="Kota/Kabupaten"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptionsGuard || []}
            placeholder="Kota/Kabupaten"
            required={false}
            isSearchable={true}
            name="adress_city_guard"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={!watch("province")}
          />
          <SelectOption
            labels="Kecamatan"
            className="rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
            labelClassName="font-bold text-xs py-2"
            options={subDistrictOptionsGuard || []}
            placeholder="Kecamatan"
            required={false}
            isSearchable={true}
            name="adress_subdistrict_guard"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={!watch("city")}
          />
          <div className="px-4 md:px-0 lg:px-0 w-full">
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
              inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
            />
          </div>
          <div className="w-70% md:w-26 lg:w-26">
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
        <div className="flex w-full justify-center lg:justify-end py-4">
          <Button variant="filled" size="md" width="w-50% lg:w-25% xl:w-15%">
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};

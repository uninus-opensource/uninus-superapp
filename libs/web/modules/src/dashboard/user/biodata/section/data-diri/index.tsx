import { EReligion } from "@uninus/entities";
import {
  Accordion,
  UploadField,
  TextField,
  RadioButton,
  SelectOption,
  Button,
} from "@uninus/web/components";
import { defaultValuesBiodata, formBiodataOne } from "../../store";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useCityGet, useProvinceGet, useSubdistrictGet } from "@uninus/web/services";
import { useBiodataUpdate } from "../../hooks";

export const DataDiriSection: FC = (): ReactElement => {
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
      title="Data diri pendaftar"
      className="w-full h-auto mt-[2rem] flex flex-col items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] gap-5"
    >
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-7 ">
          <UploadField
            className="grid lg:flex lg:items-center lg:gap-6 w-full justify-center lg:justify-start items-center h-full gap-y-6 lg:gap-y-0"
            classNameField="w-70% lg:w-auto"
            control={control}
            name="image"
            defaultImage="/illustrations/dummy-avatar.webp"
            previewImage="w-[150px] h-[150px] bg-cover object-cover rounded-full "
            preview={true}
          />
        </div>

        <section className="flex flex-wrap w-full gap-x-1 justify-center items-center lg:flex lg:justify-between lg:items-center gap-y-4 mt-2 lg:mt-6 lg:w-55% md:w-80% md:flex md:flex-wrap md:justify-between">
          {formBiodataOne.map((biodata, idx) => (
            <TextField
              key={idx}
              placeholder={biodata.placeholder}
              name={biodata.name}
              label={biodata.item}
              labelclassname="text-xl font-semibold"
              variant="sm"
              required
              inputWidth="w-70% lg:w-[17vw] xl:w-[15vw] md:w-[21vw]"
              inputHeight="h-10"
              type={biodata.type}
              control={control}
            />
          ))}
          <TextField
            name="email"
            variant="sm"
            type="email"
            placeholder="email@gmail.com"
            labelclassname="text-sm font-semibold"
            label="Email"
            required
            inputWidth="w-70% lg:w-[17vw] xl:w-[20vw] text-base md:w-[21vw]"
            inputHeight="h-10"
            control={control}
            disabled
          />
          <TextField
            inputHeight="h-10"
            name="nik"
            variant="sm"
            required
            type="text"
            placeholder="Nomor dapat dilihat dari KK atau KTP"
            labelclassname="text-sm font-semibold"
            label="NIK"
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
            control={control}
          />

          <TextField
            inputHeight="h-10"
            name="nisn"
            variant="sm"
            type="text"
            placeholder="Nomor Induk Siswa Nasional"
            required
            labelclassname="text-sm font-semibold"
            label="NISN"
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
            control={control}
          />
          {/*Start Jenis kelamin */}
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="nomor kk"
              variant="sm"
              required
              type="text"
              placeholder="Nomor dapat dilihat di KK"
              labelclassname="text-sm font-semibold"
              label="No Kartu Keluarga"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
            />
          </div>
          <RadioButton
            fieldName="Jenis Kelamin"
            name="gender"
            control={control}
            size="md"
            options={[
              { name: "Laki-laki", value: "MALE" },
              { name: "Perempuan", value: "FEMALE" },
            ]}
            required
            variant="primary"
          />
          {/*End Jenis kelamin */}

          <SelectOption
            labels="Agama"
            className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            placeholder="Agama"
            options={[
              {
                label: "Islam",
                value: EReligion.ISLAM,
              },
              {
                label: "Kristen",
                value: EReligion.KRISTEN,
              },
              {
                label: "Buddha",
                value: EReligion.BUDHA,
              },
              {
                label: "Hindu",
                value: EReligion.HINDU,
              },
              {
                label: "Konghucu",
                value: EReligion.KONGHUCU,
              },
              {
                label: "Katolik",
                value: EReligion.KATOLIK,
              },
            ]}
            isClearable={true}
            isSearchable={true}
            name="province"
            control={control}
            isMulti={false}
          />

          <TextField
            inputHeight="h-10"
            name="birth_place"
            variant="sm"
            type="text"
            placeholder="Masukan Kota tempat lahir"
            required
            labelclassname="text-sm font-semibold"
            label="Tempat Lahir"
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
            control={control}
          />
          <TextField
            inputHeight="h-10"
            name="birth_date"
            variant="sm"
            type="date"
            labelclassname="text-xl font-semibold"
            label="Tanggal Lahir"
            required
            inputWidth="lg:w-[27vw] xl:w-[25vw] md:w-[33vw] w-[70vw]"
            control={control}
          />

          <div className="mr-2">
            <SelectOption
              name="marital_status"
              labels="Status"
              placeholder="Status"
              className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
              options={[
                {
                  label: "Menikah",
                  value: "Married",
                },
                {
                  label: "Belum Menikah",
                  value: "Single",
                },
              ]}
              isSearchable={false}
              control={control}
              isMulti={false}
              isClearable={true}
            />
          </div>

          {/*start Kewarganegaeaan */}
          <RadioButton
            name="citizenship"
            fieldName="Kewarganegaraan"
            label="WNI"
            control={control}
            options={[
              { name: "WNI", value: "WNI" },
              { name: "WNA", value: "WNA" },
            ]}
            required
            inputname="kewarganegaraan"
            variant="primary"
          />
          {/*End Kewarganegaeaan */}

          <SelectOption
            name="country"
            labels="Asal Negara"
            placeholder="Asal Negara"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold"
            options={[
              {
                label: "Indonesia",
                value: "Indonesia",
              },
              {
                label: "Malaysia",
                value: "Malaysia",
              },
              {
                label: "Singapura",
                value: "Singapura",
              },
            ]}
            isClearable={true}
            isSearchable={true}
            control={control}
            isMulti={false}
          />
          <SelectOption
            labels="Provinsi"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold"
            options={provinceOptions || []}
            placeholder="Provinsi"
            isSearchable={true}
            name="province"
            isClearable={true}
            control={control}
            isMulti={false}
          />

          <SelectOption
            labels="City"
            className="rounded-md text-primary-black  w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold"
            options={cityOptions || []}
            placeholder="Kota/Kabupaten"
            isSearchable={true}
            name="city"
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={!watch("province")}
          />
          <SelectOption
            labels="Kecamatan"
            className="rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold"
            options={subDistrictOptions || []}
            placeholder="Kecamatan"
            isSearchable={true}
            name="subdistrict"
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={!watch("city")}
          />

          <TextField
            name="address"
            variant="sm"
            type="text"
            labelclassname="text-xl font-semibold"
            label="Alamat Domisili"
            control={control}
            isTextArea
            textAreaRow={5}
            textAreaCols={30}
            inputHeight="h-20"
            inputWidth="w-[68vw] md:w-[50vw] lg:w-55%"
            className="resize-none bg-grayscale-2  "
          />

          {/*Start difabel */}
          <RadioButton
            name="difabel"
            label="Ya"
            fieldName="Berkebutuhan Khusus"
            control={control}
            options={[
              { name: "Ya", value: "Ya" },
              { name: "Tidak", value: "Tidak" },
            ]}
            size="lg"
            required
            variant="primary"
          />
          {/*End difabel */}

          <SelectOption
            labels="Kategori Difabel"
            className=" rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
            placeholder="Kategori Difabel"
            options={[
              {
                label: "Tuna Rungu",
                value: "Tuna Rungu",
              },
              {
                label: "Tuna Daksa",
                value: "Tuna Daksa",
              },
              {
                label: "Tuna Netra",
                value: "Tuna Netra",
              },
              {
                label: "Tuna Wicara",
                value: "Tuna Wicara",
              },
            ]}
            isClearable={true}
            isSearchable={true}
            name="province"
            control={control}
            isMulti={false}
          />
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

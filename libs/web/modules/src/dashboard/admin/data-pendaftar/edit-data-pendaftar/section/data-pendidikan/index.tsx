import { Button, SelectOption, TextField } from "@uninus/web/components";
import {
  useCityGet,
  useEducationHistoryGet,
  useEducationMajorGet,
  useEducationTypeGet,
  useProvinceGet,
  useStudentData,
  useSubdistrictGet,
  useYearGraduationGet,
} from "@uninus/web/services";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

export const EditDataPendidikan: FC = (): ReactElement => {
  const [education, setEducation] = useState<string>("");

  const { getStudent } = useStudentData();
  const [locationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });
  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const {
    control,

    watch,
    setValue,

    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [educationType] = useState({
    degree_program_id: getStudent?.degree_program_id as unknown as string,
  });

  const { data: getEducationType } = useEducationTypeGet(educationType);

  const educationTypeOptions = useMemo(
    () =>
      getEducationType?.school_type?.map((educationType) => ({
        label: educationType?.name,
        value: educationType?.id.toString(),
      })),
    [getEducationType?.school_type],
  );

  // Education History
  const [educationHistory] = useState({
    search: "",
    npsn: student?.education_npsn ? student?.education_npsn : watch("education_npsn"),
  });

  const { data: getEducationHistory } = useEducationHistoryGet(educationHistory);

  const educationHistoryOptions = useMemo(() => {
    return getEducationHistory?.education?.map((educationHistory) => ({
      value: educationHistory?.id.toString(),
      npsn: educationHistory?.npsn,
      school_name: educationHistory.name,
      province: educationHistory.province,
      sub_district: educationHistory.sub_district,
      district_city: educationHistory.district_city,
      street_address: educationHistory.street_address,
    }));
  }, [getEducationHistory?.education]);

  // Graduate Year
  const [graduate] = useState({
    search: "",
  });

  const { data: getGraduate } = useYearGraduationGet(graduate);

  const graduateOptions = useMemo(
    () =>
      getGraduate?.year?.map((year) => ({
        label: year?.name.toString(),
        value: year?.id.toString(),
      })),
    [getGraduate?.year],
  );

  // Education Major

  const { data: getMajor } = useEducationMajorGet({
    education_type_id: watch("education_type_id"),
    search: "",
  });

  const majorOptions = useMemo(
    () =>
      getMajor?.education_major?.map((major) => ({
        label: major?.name,
        value: major?.id.toString(),
      })),
    [getMajor?.education_major],
  );

  const { data: getProvincies } = useProvinceGet(locationMeta);

  const schoolProvinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );

  const { data: getCitySchool } = useCityGet({
    province_id: watch("address_province_school"),
    search: "",
  });

  const citySchoolOptions = useMemo(
    () =>
      getCitySchool?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCitySchool?.city],
  );

  const { data: getSubdistrictSchool } = useSubdistrictGet({
    city_id: watch("address_city_school"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrictSchool?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrictSchool?.subdistrict],
  );

  useEffect(() => {
    if (education || student?.education_npsn) {
      setValue(
        "school_name",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.school_name,
      );
      setValue(
        "school_province",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.province,
      );
      setValue(
        "school_city",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.district_city,
      );
      setValue(
        "school_subdistrict",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.sub_district,
      );
      setValue(
        "school_address",
        educationHistoryOptions?.find(
          (item) => item.npsn === (student?.education_npsn ? student?.education_npsn : education),
        )?.street_address,
      );
    } else {
      setValue("school_name", "");
      setValue("school_province", "");
      setValue("school_city", "");
      setValue("school_subdistrict", "");
      setValue("school_address", "");
    }
  }, [setValue, education, educationHistoryOptions, student?.education_npsn]);

  return (
    <div>
      <form key="data-diri-form" noValidate className="bg-primary-white">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <section
          key="form-biodata"
          className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%"
        >
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <SelectOption
              name="education_type_id"
              labels="Jenis Pendidikan Asal"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.education_type_id
                  ? educationTypeOptions?.find(
                      (item) => Number(item.value) === student?.education_type_id,
                    )?.label
                  : "Jenis Pendidikan"
              }
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              options={educationTypeOptions || []}
              isSearchable={false}
              isClearable={true}
              control={control}
              isMulti={false}
              status={"error"}
              message={errors?.education_type_id?.message as string}
            />
            <SelectOption
              name="province_id"
              labels="Provinsi"
              placeholder={
                student?.province_id
                  ? schoolProvinceOptions?.find(
                      (province) => Number(province.value) === student?.province_id,
                    )?.label
                  : "Provinsi"
              }
              labelClassName="font-bold text-xs py-2"
              options={schoolProvinceOptions || []}
              isSearchable={true}
              isClearable={true}
              control={control}
              // ref={citizenref}
              isMulti={false}
              status={errors?.province_id?.message ? "error" : "none"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.province_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <SelectOption
              name="graduation_year"
              labelClassName="font-bold text-xs py-2"
              labels="Tahun Lulus"
              placeholder={
                student?.graduation_year
                  ? graduateOptions?.find((item) => item.value === student?.graduation_year)?.label
                  : "Tahun Lulus"
              }
              options={graduateOptions || []}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              isSearchable={false}
              control={control}
              isMulti={false}
              status="error"
              message={errors?.graduation_year?.message as string}
            />
            <SelectOption
              name="city_id"
              labels="Kota/Kabupaten"
              placeholder={
                student?.city_id
                  ? citySchoolOptions?.find((city) => Number(city.value) === student?.city_id)
                      ?.label
                  : "Kota/Kabupaten"
              }
              labelClassName="font-bold text-xs py-2"
              options={citySchoolOptions || []}
              isSearchable={true}
              isClearable={true}
              // ref={provinceref}
              control={control}
              isMulti={false}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.city_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="education_npsn"
              variant="sm"
              required={"Harus diisi"}
              type="text"
              labelclassname="text-sm font-semibold"
              label="NPSN"
              placeholder="Masukan NPSN"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              message={errors?.education_npsn?.message as string}
              status={errors?.education_npsn?.message ? "error" : "none"}
              onChange={(e) => {
                setValue("education_npsn", e.target.value);
                setEducation(e.target.value);
              }}
            />
            <SelectOption
              name="subdistrict_id"
              labels="Kecamatan"
              placeholder={
                student?.subdistrict_id
                  ? subDistrictOptions?.find(
                      (subdistrict) => Number(subdistrict.value) === student?.subdistrict_id,
                    )?.label
                  : "Kecamatan"
              }
              labelClassName="font-bold text-xs py-2"
              options={subDistrictOptions || []}
              isSearchable={true}
              // ref={subdisref}
              control={control}
              isMulti={false}
              isClearable={true}
              status={"error"}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
              message={errors?.subdistrict_id?.message as string}
            />
          </div>
          <div className="w-80% px-5 flex flex-col gap-y-4 md:flex-row md:w-full md:px-0 md:justify-between">
            <TextField
              inputHeight="h-10"
              name="school_name"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Pendidikan Asal"
              placeholder="Nama Sekolah"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled
            />
            <SelectOption
              name="education_major_id"
              labels="Jurusan Pendidikan Asal"
              required={true}
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.education_major_id
                  ? majorOptions?.find((item) => Number(item.value) === student?.education_major_id)
                      ?.label
                  : "Jurusan Pendidikan"
              }
              options={majorOptions || []}
              isSearchable={false}
              control={control}
              isMulti={false}
              status="error"
              message={errors?.education_major_id?.message as string}
              className="w-full md:w-[33vw] lg:w-[27vw] xl:w-[25vw]"
            />
          </div>
          <div className="px-6 md:px-0 lg:px-0 w-full md:w-fit">
            <TextField
              name="school_address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Pendidikan Asal"
              required
              control={control}
              isTextArea
              textAreaRow={5}
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[80vw] lg:w-[60vw] w-[70vw]"
              className="resize-none bg-grayscale-2  "
              disabled
            />
          </div>
          <div className="flex w-full justify-center lg:justify-end py-4 mt-8 gap-x-3">
            <Button type="submit" variant="filled-red" size="md" width="w-70% lg:w-15% xl:w-15%">
              Batal
            </Button>
            <Button type="submit" variant="filled" size="md" width="w-70% lg:w-15% xl:w-15%">
              Submit
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
};

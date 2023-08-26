import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";
import {
  useEducationHistoryGet,
  useEducationMajorGet,
  useEducationTypeGet,
  useYearGraduationGet,
} from "./hooks";
import { dataPendidikan } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import { TVSUpdateStudent, VSUpdateStudent } from "@uninus/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStudentData } from "@uninus/web/services";

export const DataPendidikanSection: FC = (): ReactElement => {
  const [education, setEducation] = useState<string>("");
  const [isDisabled, setIsdisabled] = useState<boolean>(false);

  const { getStudent } = useStudentData();
  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "all",
    defaultValues: {},
  });

  // Education Type
  const [educationType] = useState({
    degree_program_id: getStudent?.degree_program_id as unknown as string,
  });

  const { data: getEducationType } = useEducationTypeGet(educationType);

  const educationTypeOptions = useMemo(
    () =>
      getEducationType?.education_type?.map((educationType) => ({
        label: educationType?.name,
        value: educationType?.id.toString(),
      })),
    [getEducationType?.education_type],
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
  const [major] = useState({
    search: "",
    education_type_id: watch("education_type_id"),
  });

  const { data: getMajor } = useEducationMajorGet(major);

  const majorOptions = useMemo(
    () =>
      getMajor?.education_major?.map((major) => ({
        label: major?.name,
        value: major?.id.toString(),
      })),
    [getMajor?.education_major],
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

  useEffect(() => {
    reset(student);
  }, [student, reset]);

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    dataPendidikan.education_type_id = Number(data?.education_type_id);
    dataPendidikan.education_major_id = Number(data?.education_major_id);
    dataPendidikan.education_npsn = data?.education_npsn;
    dataPendidikan.graduation_year = data?.graduation_year;

    try {
      mutate(
        { ...dataPendidikan },
        {
          onSuccess: () => {
            setIsdisabled(true);
            setTimeout(() => {
              toast.success("Berhasil mengisi formulir", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 500);
          },
          onError: () => {
            setTimeout(() => {
              toast.error("Gagal mengisi formulir", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 500);
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Accordion
      title="Data Pendidikan"
      key="data-pendidikan-section"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit}>
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
        <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-55% md:flex md:flex-wrap md:w-80% md:justify-between text-left">
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
            className="rounded-md text-primary-black w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
            options={educationTypeOptions || []}
            isSearchable={false}
            isClearable={true}
            control={control}
            isMulti={false}
            disabled={isDisabled || !!student?.education_type_id}
          />
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
            className="rounded-md text-primary-black w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
            isSearchable={false}
            control={control}
            isMulti={false}
            disabled={isDisabled || !!student?.graduation_year}
          />

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
            message={errors?.education_npsn?.message}
            onChange={(e) => {
              setValue("education_npsn", e.target.value);
              setEducation(e.target.value);
            }}
            disabled={isDisabled || !!student?.education_npsn}
          />

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

          <div className="flex flex-col items-center justify-center md:grid md:grid-cols-3 gap-2 w-full">
            <TextField
              inputHeight="h-10"
              name="school_province"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Provinsi"
              placeholder="Provinsi Sekolah"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled
            />

            <TextField
              inputHeight="h-10"
              name="school_city"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Kota/Kabupaten"
              placeholder="Kota Sekolah"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled
            />

            <TextField
              inputHeight="h-10"
              name="school_subdistrict"
              variant="sm"
              type="text"
              labelclassname="text-sm font-semibold"
              label="Kecamatan"
              placeholder="Kecamatan Sekolah"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled
            />
          </div>

          <div className="lg:w-full">
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
              className=" rounded-md text-primary-black w-70% lg:w-[17vw] xl:w-[17vw] md:w-[21vw]"
              isSearchable={false}
              control={control}
              isMulti={false}
              disabled={isDisabled || !watch("education_type_id")}
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
              inputWidth="w-full md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
              disabled
            />
          </div>
        </section>
        <div className="flex w-full justify-center lg:justify-end py-4">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-50% lg:w-25% xl:w-15%"
            disabled={isDisabled || !!student?.education_npsn}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};

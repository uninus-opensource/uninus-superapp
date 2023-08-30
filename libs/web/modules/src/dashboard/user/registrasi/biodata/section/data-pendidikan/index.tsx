import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, TextField, SelectOption, Button, Modal } from "@uninus/web/components";
import { useForm, FieldValues } from "react-hook-form";
import { useBiodataUpdate } from "../../hooks";
import { dataPendidikan } from "../../store";
import { ToastContainer, toast } from "react-toastify";
import { VSDataPendidikan } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useStudentData,
  useEducationHistoryGet,
  useEducationMajorGet,
  useEducationTypeGet,
  useYearGraduationGet,
} from "@uninus/web/services";

export const DataPendidikanSection: FC = (): ReactElement => {
  const [education, setEducation] = useState<string>("");
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

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
    resolver: zodResolver(VSDataPendidikan),
    mode: "all",
    defaultValues: {},
  });

  const handleCloseModal = () => {
    setIsShowModal(!isShowModal);
  };

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
    reset({
      education_type_id: student?.education_type_id,
      graduation_year: student?.graduation_year,
      education_npsn: student?.education_npsn,
      education_major_id: student?.education_major_id,
    });
  }, [student, reset, getStudent]);

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
      <form onSubmit={onSubmit} noValidate>
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
        <h1 className="text-red-4 text-sm pb-4">
          *Catatan :{" "}
          <span className="text-primary-black">
            Data NPSN dapat dilihat di{" "}
            <a href="https://dapo.kemdikbud.go.id/pencarian">
              https://dapo.kemdikbud.go.id/pencarian
            </a>
          </span>
        </h1>
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
            size="md"
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
            size="md"
            isSearchable={false}
            control={control}
            isMulti={false}
            disabled={isDisabled || !!student?.graduation_year}
          />

          <div>
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
              disabled={isDisabled || !!student?.education_npsn}
            />
            <p className="text-[0.8rem] text-primary-yellow">
              Jika data tidak ditemukan, silakan
              <span
                className="text-primary-green hover:cursor-pointer underline"
                onClick={handleCloseModal}
              >
                + Tambah Sekolah
              </span>
            </p>
          </div>

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
              size="md"
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
      <Modal showModal={isShowModal} onClose={handleCloseModal} modalTitle="Tambahkan Data Sekolah">
        <form className="w-full flex flex-col justify-center items-center gap-3">
          <div className="w-full">
            <TextField
              inputHeight="h-10"
              name="custom_school_name"
              variant="sm"
              type="text"
              required
              labelclassname="text-sm font-semibold"
              label="Nama Asal Sekolah"
              placeholder="Masukan Nama Sekolah"
              inputWidth="w-full"
              control={control}
            />
          </div>

          <div className="w-full flex gap-2 justify-between items-center">
            <div className="w-full">
              <SelectOption
                name="custom_major"
                labels="Jenis Sekolah"
                labelClassName="font-bold text-xs py-2"
                placeholder="Pilih Jenis Sekolah"
                size="md"
                options={[
                  {
                    value: "SMK",
                    label: "SMK",
                  },
                  {
                    value: "MAN",
                    label: "MAN",
                  },
                  {
                    value: "SMKS",
                    label: "SMKS",
                  },
                  {
                    value: "MAS",
                    label: "MAS",
                  },
                  {
                    value: "SMAS",
                    label: "SMAS",
                  },
                  {
                    value: "SMAN",
                    label: "SMAN",
                  },
                ]}
                isSearchable={true}
                isClearable={true}
                control={control}
                isMulti={false}
                className="w-full"
                required
              />
            </div>

            <div className="w-full mt-4">
              <TextField
                inputHeight="h-10"
                name="custom_NPSN"
                variant="sm"
                type="text"
                required
                labelclassname="text-sm font-semibold"
                label="NPSN ( Nomor Pokok Sekolah Nasional )"
                placeholder="Masukan NPSN"
                control={control}
              />
            </div>
          </div>

          <div className="w-full flex gap-3 justify-center items-center">
            <div className="w-full">
              <TextField
                inputHeight="h-10"
                name="custom_school_province"
                variant="sm"
                type="text"
                labelclassname="text-sm font-semibold"
                label="Provinsi"
                placeholder="Provinsi Sekolah"
                control={control}
              />
            </div>

            <div className="w-full">
              <TextField
                inputHeight="h-10"
                name="custom_school_city"
                variant="sm"
                type="text"
                labelclassname="text-sm font-semibold"
                label="Kota/Kabupaten"
                placeholder="Kota Sekolah"
                control={control}
              />
            </div>

            <div className="w-full">
              <TextField
                inputHeight="h-10"
                name="custom_school_subdistrict"
                variant="sm"
                type="text"
                labelclassname="text-sm font-semibold"
                label="Kecamatan"
                placeholder="Kecamatan Sekolah"
                control={control}
              />
            </div>
          </div>

          <div className="w-full flex justify-end items-center gap-3">
            <span
              className="text-secondary-green-5 px-2 py-1 hover:cursor-pointer font-bold"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              Batal
            </span>
            <Button variant="filled" size="md">
              Tambahkan
            </Button>
          </div>
        </form>
      </Modal>
    </Accordion>
  );
};

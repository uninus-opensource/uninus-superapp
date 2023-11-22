import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Accordion, Button, TextField, UploadField } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { NilaiValues, TUploadFileRequest, TUploadFileResponse } from "../../type";
import { useBiodataUpdate, useGetStudentGrade, useUploadFile } from "../../hooks";
import { useDashboardStateControl } from "@uninus/web/services";

// import { TVSDataNilai, VSDataNilai } from "./schema";
// import { zodResolver } from "@hookform/resolvers/zod";

export const DataNilaiSection: FC = (): ReactElement => {
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getDashboardControlState, setDashboardControlState } = useDashboardStateControl();

  const { control, handleSubmit, reset, setValue, watch, getValues } = useForm<NilaiValues>({
    mode: "all",
  });
  const { data, refetch } = useGetStudentGrade();
  const { mutate: upload } = useUploadFile();
  const { mutate } = useBiodataUpdate();
  const uploadFile = async (payload: TUploadFileRequest): Promise<TUploadFileResponse> => {
    return new Promise((resolve, reject) => {
      upload(payload, {
        onSuccess: (file) => resolve(file),
        onError: (error) => reject(error),
      });
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const {
        average_grade,
        average_utbk,
        utbk_pu,
        utbk_kk,
        utbk_ppu,
        utbk_kmbm,
        dokumen1,
        dokumen2,
        dokumen3,
        dokumen4,
        UTBK,
        ...dataGrade
      } = data;
      const studentGrade = JSON.stringify(dataGrade)
        .replace(/{|}/gi, "")
        .split(",")
        .map((el) => {
          const data = el?.split(":");
          return {
            subject: data?.[0]?.includes("mtk")
              ? "matematika"
              : data?.[0]?.includes("bind")
                ? "indonesia"
                : data?.[0]?.includes("bing")
                  ? "inggris"
                  : "",
            semester: data?.[0]?.includes("1")
              ? "1"
              : data?.[0]?.includes("2")
                ? "2"
                : data?.[0]?.includes("3")
                  ? "3"
                  : data?.[0]?.includes("4")
                    ? "4"
                    : "0",
            grade: Number(data?.[1]?.replace(/"|'/gi, "")),
          };
        });

      const dokumen_1 = await uploadFile({
        file: dokumen1,
      });
      const dokumen_2 = await uploadFile({
        file: dokumen2,
      });
      const dokumen_3 = await uploadFile({
        file: dokumen3,
      });
      const dokumen_4 = await uploadFile({
        file: dokumen4,
      });
      const dokumen_utbk = await uploadFile({
        file: UTBK,
      });

      mutate(
        {
          student_grade: studentGrade,
          average_grade: Number(average_grade),
          average_utbk: Number(average_utbk),
          utbk_kk: Number(utbk_kk),
          utbk_kmbm: Number(utbk_kmbm),
          utbk_pu: Number(utbk_pu),
          utbk_ppu: Number(utbk_ppu),

          documents: [
            { name: "Rapot Semester 1", path: dokumen_1.file_url },
            { name: "Rapot Semester 2", path: dokumen_2.file_url },
            { name: "Rapot Semester 3", path: dokumen_3.file_url },
            { name: "Rapot Semester 4", path: dokumen_4.file_url },
            { name: "Nilai UTBK", path: dokumen_utbk.file_url },
          ],
        },
        {
          onSuccess: () => {
            setIsdisabled(true);
            setIsLoading(false);
            refetch().then((newData) => {
              reset({
                average_grade: newData.data?.average_grade as number,
                average_utbk: newData.data?.average_utbk,
                utbk_pu: newData.data?.utbk_pu,
                utbk_kk: newData.data?.utbk_kk,
                utbk_ppu: newData.data?.utbk_ppu,
                utbk_kmbm: newData.data?.utbk_kmbm,
              });
            });
            setDashboardControlState(!getDashboardControlState);
            setTimeout(() => {
              toast.success("Berhasil mengisi Data nilai", {
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
            setIsLoading(false);
            setTimeout(() => {
              toast.error("Gagal mengisi Data nilai", {
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

  const student = useMemo(() => {
    return data;
  }, [data]);

  const dataStudentGrade = useMemo(
    () =>
      student?.student_grade.reduce(
        (obj, item) => (
          (obj[
            `${
              item?.subject?.includes("indonesia")
                ? `bind${item.semester}`
                : item?.subject?.includes("matematika")
                  ? `mtk${item?.semester}`
                  : item?.subject?.includes("inggris") && `bing${item?.semester}`
            }`
          ] = item.grade),
          obj
        ),
        {} as { [key: string]: number },
      ),

    [student?.student_grade],
  );
  const watchStudentGrade = watch([
    "mtk1",
    "mtk2",
    "mtk3",
    "mtk4",
    "bind1",
    "bind2",
    "bind3",
    "bind4",
    "bing1",
    "bing2",
    "bing3",
    "bing4",
  ]);

  const watchUtbk = watch(["utbk_kk", "utbk_pu", "utbk_ppu", "utbk_kmbm"]);
  useEffect(() => {
    if (student?.student_grade[0].grade !== 0) {
      setIsdisabled(true);
    } else {
      setIsdisabled(false);
    }
    reset({
      ...dataStudentGrade,
      utbk_kk: student?.utbk_kk,
      utbk_pu: student?.utbk_pu,
      utbk_ppu: student?.utbk_ppu,
      utbk_kmbm: student?.utbk_kmbm,
    });
  }, [dataStudentGrade, reset, student]);

  useEffect(() => {
    const {
      utbk_kk,
      utbk_pu,
      utbk_ppu,
      utbk_kmbm,
      mtk1,
      mtk2,
      mtk3,
      mtk4,
      bind1,
      bind2,
      bind3,
      bind4,
      bing1,
      bing2,
      bing3,
      bing4,
    } = getValues();

    const average = Object.values({
      mtk1,
      mtk2,
      mtk3,
      mtk4,
      bind1,
      bind2,
      bind3,
      bind4,
      bing1,
      bing2,
      bing3,
      bing4,
    });

    const result = Number(average.reduce((acc, curr) => Number(acc) + Number(curr), 0));
    const averageUtbk =
      utbk_kk && utbk_pu && utbk_ppu && utbk_kmbm // Check if all UTBK values are present
        ? Object.values({ utbk_kk, utbk_pu, utbk_ppu, utbk_kmbm })
        : [];

    const resultUtbk = Number(averageUtbk.reduce((acc, curr) => Number(acc) + Number(curr), 0));

    setValue(
      "average_grade",
      Number(student?.average_grade === 0 ? (result / 12).toFixed(1) : student?.average_grade),
    );

    setValue(
      "average_utbk",
      Number(student?.average_utbk === 0 ? (resultUtbk / 4).toFixed(1) : student?.average_utbk),
    );
  }, [
    getValues,
    setValue,
    student?.average_grade,
    student?.average_utbk,
    watchStudentGrade,
    watchUtbk,
  ]);

  return (
    <Accordion
      key="data-nilai-section"
      title="Nilai Rapor dan Skor UTBK"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4 text-left"
      className="min-w-[90%] lg:w-full h-auto mt-[2rem] flex flex-col gap-5 items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] pb-6 md:pb-0"
    >
      <form onSubmit={onSubmit} className="w-screen">
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
        <h1 className="font-bold text-2xl md:pl-16 lg:pl-0 mt-3 place-self-start text-center md:text-left">
          Nilai Rapor
        </h1>
        <p className="text-sm lg:text-base text-grayscale-7 mt-2 md:text-left md:pl-16 lg:pl-0">
          Masukkan hanya nilai pengetahuan <span className="text-red text-base text-red-6 ">*</span>
        </p>
        <section className="w-5/6 flex px-2 py-6 gap-y-4 mx-auto flex-col relative justify-center overflow-x-scroll lg:w-full lg:overflow-x-hidden">
          <div className="md:ml-20 lg:ml-[8.5rem] flex gap-x-12 md:gap-x-5 mt-9 lg:gap-x-11 lg:w-full ">
            <p className="text-[12px] lg:text-base font-bold lg:pr-0 md:hidden">Semester</p>
            <div className="mb-4 flex-shrink-0">
              <p className="labelSemesterStyle">Semester 1</p>
              <p className="text-[13px] ml-[2px] md:hidden">1</p>
            </div>
            <div className="mb-4 flex-shrink-0">
              <p className="labelSemesterStyle">Semester 2</p>
              <p className="text-[13px] ml-[2px] md:hidden">2</p>
            </div>
            <div className="mb-4 flex-shrink-0">
              <p className="labelSemesterStyle">Semester 3</p>
              <p className="text-[13px] ml-[2px] md:hidden">3</p>
            </div>
            <div className="mb-4 flex-shrink-0">
              <p className="labelSemesterStyle">Semester 4</p>
              <p className="text-[13px] ml-[2px] md:hidden">4</p>
            </div>
          </div>

          <div className=" flex items-center gap-x-5 lg:gap-x-10 my-auto">
            <p className="labelCourseStyle">Matematika</p>
            <div className="flex gap-x-4 md:gap-x-7">
              <TextField
                inputHeight="h-10"
                name="mtk1"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk1 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="mtk2"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk2 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="mtk3"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk3 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="mtk4"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.mtk4 ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-5 lg:gap-x-10 my-auto">
            <p className="labelCourseStyle">B.Indonesia</p>
            <div className="flex gap-x-4 md:gap-x-7">
              <TextField
                inputHeight="h-10"
                name="bind1"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm"
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind1 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bind2"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm"
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind2 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bind3"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind3 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bind4"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bind4 ? true : false}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-6 lg:gap-x-14 my-auto">
            <p className="labelCourseStyle">B.inggris</p>
            <div className="flex gap-x-4 md:gap-x-7 ml-4 lg:ml-2">
              <TextField
                inputHeight="h-10"
                name="bing1"
                variant="md"
                type="number"
                labelclassname="text-xs md:text-sm"
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                className="ml-4"
                disabled={isDisabled || dataStudentGrade?.bing1 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bing2"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bing2 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bing3"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bing3 ? true : false}
              />
              <TextField
                inputHeight="h-10"
                name="bing4"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
                control={control}
                disabled={isDisabled || dataStudentGrade?.bing4 ? true : false}
              />
            </div>
          </div>
          <div className="flex lg:gap-x-10 items-center gap-x-8 my-auto w-screen">
            <div className="flex-shrink-0">
              <p className="labelCourseStyle">Rata-rata</p>
            </div>
            <div className="w-full lg:ml-4 lg:pl-1 lg:pr-16">
              <TextField
                inputHeight="h-10"
                name="average_grade"
                variant="md"
                type="number"
                labelclassname="text-sm "
                inputWidth="text-base text-center md:w-[50%]"
                control={control}
                placeholder={(student?.average_grade as unknown as string) || ""}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-x-6 lg:gap-x-4 w-full">
            <p className="text-[12px] lg:text-base font-bold text-left">Upload Rapor</p>
            <div className="flex gap-4 mt-2">
              <UploadField
                control={control}
                name="dokumen1"
                variant="custom"
                inputLabel="Pilih File"
                labelClassName={
                  watch("dokumen1")
                    ? "labelTextUploaded"
                    : isDisabled
                      ? "labelTextDisabled"
                      : "labelText"
                }
                preview={false}
                isDisabled={isDisabled}
              />
              <UploadField
                control={control}
                name="dokumen2"
                variant="custom"
                inputLabel="Pilih File"
                labelClassName={
                  watch("dokumen2")
                    ? "labelTextUploaded"
                    : isDisabled
                      ? "labelTextDisabled"
                      : "labelText"
                }
                preview={false}
                isDisabled={isDisabled}
              />
              <UploadField
                control={control}
                name="dokumen3"
                variant="custom"
                inputLabel="Pilih File"
                labelClassName={
                  watch("dokumen3")
                    ? "labelTextUploaded"
                    : isDisabled
                      ? "labelTextDisabled"
                      : "labelText"
                }
                preview={false}
                isDisabled={isDisabled}
              />
              <UploadField
                control={control}
                name="dokumen4"
                variant="custom"
                inputLabel="Pilih File"
                labelClassName={
                  watch("dokumen4")
                    ? "labelTextUploaded"
                    : isDisabled
                      ? "labelTextDisabled"
                      : "labelText"
                }
                preview={false}
                isDisabled={isDisabled}
              />
            </div>
          </div>
        </section>
        <h1 className="font-bold text-2xl lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10 mt-16 text-left">
          Skor SNBT
        </h1>
        <section className="w-5/6 flex px-2 py-6 gap-y-4 mx-auto flex-col  justify-center  lg:w-full  ">
          <div className="flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ">
            <p className="font-bold text-sm md:text-base">Penalaran Umum</p>
            <TextField
              inputHeight="h-10"
              name="utbk_pu"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk_pu ? true : false}
            />
          </div>
          <div className="flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ">
            <p className="font-bold text-sm md:text-base">Kemampuan Kuantitatif</p>
            <TextField
              inputHeight="h-10"
              name="utbk_kk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk_kk ? true : false}
            />
          </div>
          <div className="flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ">
            <p className="font-bold text-sm md:text-base text-left">
              Pengetahuan dan Pemahaman Umum
            </p>
            <TextField
              inputHeight="h-10"
              name="utbk_ppu"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk_ppu ? true : false}
            />
          </div>
          <div className="flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ">
            <p className="font-bold text-sm md:text-base text-left">
              Kemampuan Memahami Bacaan dan Menulis
            </p>
            <TextField
              inputHeight="h-10"
              name="utbk_kmbm"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              disabled={isDisabled || student?.utbk_kmbm ? true : false}
            />
          </div>
        </section>
        <section className="w-5/6 flex px-2 py-6 gap-y-4 mx-auto flex-col  justify-center   lg:w-full">
          <div className="flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ">
            <p className="font-bold text-sm md:text-base">Rata-Rata Skor :</p>
            <TextField
              inputHeight="h-10"
              name="average_utbk"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="w-26 text-base text-center"
              control={control}
              placeholder={(student?.average_utbk as unknown as string) || ""}
              disabled
            />
          </div>
          <div className="flex items-center justify-between w-full lg:w-1/2  xl:pr-12 2xl:pr-16 ">
            <p className="flex-shrink-0 mr-5 font-bold text-sm md:text-base">Sertifikat UTBK : </p>
            <UploadField
              control={control}
              name="UTBK"
              variant="custom"
              inputLabel="Pilih File"
              labelClassName={
                watch("UTBK") ? "labelTextUploaded" : isDisabled ? "labelTextDisabled" : "labelText"
              }
              preview={false}
              isDisabled={isDisabled}
            />
          </div>
        </section>
        <div className="flex w-5/6 lg:w-3/5 justify-end p-4 mt-8">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-30% lg:w-25% xl:w-15%"
            disabled={isDisabled}
            loading={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};

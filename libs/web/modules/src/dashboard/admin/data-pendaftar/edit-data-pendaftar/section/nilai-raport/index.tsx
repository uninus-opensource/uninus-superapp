import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@uninus/web/components";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useStudentDataById } from "@uninus/web/services";
import { usePathname } from "next/navigation";
import { useBiodataUpdateById } from "../../hooks";
import { NilaiValuesEdit } from "../../type";

export const EditDataNilaiRaport: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { control, setValue, watch, getValues, reset, handleSubmit } = useForm<NilaiValuesEdit>({
    mode: "all",
  });
  const { getStudentbyId } = useStudentDataById();

  const student = useMemo(() => {
    return getStudentbyId;
  }, [getStudentbyId]);

  const path = usePathname();
  const id = path.slice(46);

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

  const dataStudentGrade = useMemo(
    () =>
      student?.student_grade?.reduce(
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
        {} as { [key: string]: number | null },
      ),

    [student?.student_grade],
  );

  useEffect(() => {
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

  const link = [
    {
      href: student?.documents?.find((x) => x?.name === "Rapot Semester 1")?.path,
    },
    {
      href: student?.documents?.find((x) => x?.name === "Rapot Semester 2")?.path,
    },
    {
      href: student?.documents?.find((x) => x?.name === "Rapot Semester 3")?.path,
    },
    {
      href: student?.documents?.find((x) => x?.name === "Rapot Semester 4")?.path,
    },
  ];

  const { mutate } = useBiodataUpdateById(id);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const { average_grade, average_utbk, utbk_pu, utbk_kk, utbk_ppu, utbk_kmbm, ...dataGrade } =
        data;
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

      mutate(
        {
          student_grade: studentGrade,
          average_grade: Number(average_grade),
          average_utbk: Number(average_utbk),
          utbk_kk: Number(utbk_kk),
          utbk_kmbm: Number(utbk_kmbm),
          utbk_pu: Number(utbk_pu),
          utbk_ppu: Number(utbk_ppu),
        },
        {
          onSuccess: () => {
            setIsLoading(false);

            setTimeout(() => {
              toast.success("Berhasil mengedit data pendaftar", {
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
              toast.error("Gagal mengedit data pendaftar", {
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
    <form onSubmit={onSubmit} className="bg-primary-white py-4 px-8 mb-20">
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

      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="md:ml-20 lg:ml-[8rem] flex gap-x-12 md:gap-x-5 mt-9 lg:gap-x-11 lg:w-full ">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0 md:hidden">Semester</p>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 1</p>
            <p className="text-[13px] md:hidden">1</p>
          </div>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 2</p>
            <p className="text-[13px] md:hidden">2</p>
          </div>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 3</p>
            <p className="text-[13px] md:hidden">3</p>
          </div>
          <div className="mb-4 flex-shrink-0">
            <p className="hidden md:block md:text-[13px] lg:text-base">Semester 4</p>
            <p className="text-[13px] md:hidden">4</p>
          </div>
        </div>

        <div className=" flex items-center gap-x-5 lg:gap-x-10 my-auto">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0">Matematika</p>
          <div className="flex gap-x-4 md:gap-x-4">
            <TextField
              inputHeight="h-10"
              name="mtk1"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="mtk2"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="mtk3"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="mtk4"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-5 lg:gap-x-10 my-auto">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0">B.Indonesia</p>
          <div className="flex gap-x-4 md:gap-x-4">
            <TextField
              inputHeight="h-10"
              name="bind1"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm"
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="bind2"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm"
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="bind3"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="bind4"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
          </div>
        </div>
        <div className="flex items-center gap-x-6 lg:gap-x-14 my-auto">
          <p className="text-[12px] lg:text-base font-bold lg:pr-0">B.inggris</p>
          <div className="flex gap-x-4 md:gap-x-4 ml-4 lg:ml-2">
            <TextField
              inputHeight="h-10"
              name="bing1"
              variant="md"
              type="number"
              labelclassname="text-xs md:text-sm"
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
              className="ml-4"
            />
            <TextField
              inputHeight="h-10"
              name="bing2"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="bing3"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
            <TextField
              inputHeight="h-10"
              name="bing4"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="lg:w-26 w-10 md:w-16 text-xs md:text-base text-center"
              control={control}
            />
          </div>
        </div>
        <div className="flex lg:gap-x-10 items-center gap-x-8 my-auto w-full ">
          <div className="flex-shrink-0">
            <p className="text-[12px] lg:text-base font-bold lg:pr-0">Rata-rata</p>
          </div>
          <div className="w-full lg:ml-4 lg:pl-1 lg:pr-16">
            <TextField
              inputHeight="h-10"
              name="average_grade"
              variant="md"
              type="number"
              labelclassname="text-sm "
              inputWidth="text-base text-center md:w-full lg:w-45% "
              control={control}
              disabled
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-x-6 lg:gap-x-4 w-full justify-around">
          <p className="text-[12px] lg:text-base font-bold text-left">Rapor</p>
          <div className="flex gap-4 mt-2">
            {link.map((item, index) => (
              <Link
                key={index}
                href={(item.href as string) || ""}
                className="flex items-center justify-center bg-primary-green w-[17vw] md:w-[10vw] text-primary-white p-2 rounded-[3px] \
               text-base"
              >
                Buka File
              </Link>
            ))}
          </div>
        </div>
      </section>
      <h1 className="font-bold text-2xl lg:pl-0 md:pl-[11vw] xl:pl-0 place-self-start pl-10 mt-16 text-left">
        Skor SNBT
      </h1>

      <section className="flex flex-wrap justify-center items-center gap-x-1 w-full lg:flex lg:items-center gap-y-4 lg:justify-between lg:w-[60vw] md:flex md:flex-wrap md:w-80% md:justify-between text-left xl:w-55%">
        <div className="flex items-center justify-between w-full   ">
          <p className="font-bold text-sm md:text-base">Penalaran Umum</p>
          <TextField
            inputHeight="h-10"
            name="utbk_pu"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full    ">
          <p className="font-bold text-sm md:text-base">Kemampuan Kuantitatif</p>
          <TextField
            inputHeight="h-10"
            name="utbk_kk"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full  ">
          <p className="font-bold text-sm md:text-base text-left">Pengetahuan dan Pemahaman Umum</p>
          <TextField
            inputHeight="h-10"
            name="utbk_ppu"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
          />
        </div>
        <div className="flex items-center justify-between w-full   ">
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
          />
        </div>
        <div className="flex items-center justify-between w-full    ">
          <p className="font-bold text-sm md:text-base">Rata-Rata Skor :</p>
          <TextField
            inputHeight="h-10"
            name="average_utbk"
            variant="md"
            type="number"
            labelclassname="text-sm "
            inputWidth="w-26 text-base text-center"
            control={control}
            disabled
          />
        </div>
        <div className="flex items-center justify-between w-full   ">
          <p className="flex-shrink-0  font-bold text-sm md:text-base">Sertifikat UTBK : </p>
          <Link
            href={(student?.documents?.find((x) => x?.name === "Nilai UTBK")?.path as string) || ""}
            className="flex items-center justify-center bg-primary-green md:w-[10vw] text-primary-white p-2 rounded-[3px] \
               text-base"
          >
            Buka File
          </Link>
        </div>
        <div className="flex w-full justify-center lg:justify-end py-4 mt-8 gap-x-3">
          <Button href={"/dashboard/data-pendaftar"} variant="filled-red" size="md">
            Batal
          </Button>
          <Button type="submit" loading={isLoading} variant="filled" size="md">
            Submit
          </Button>
        </div>
      </section>
    </form>
  );
};

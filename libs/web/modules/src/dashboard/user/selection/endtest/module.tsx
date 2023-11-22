"use client";
import { FC, ReactElement, useEffect, useMemo } from "react";
import Image from "next/image";
import { useStudentData } from "@uninus/web/services";
import { RedirectLink } from "@uninus/web/components";
import { RedirectType, redirect, useRouter } from "next/navigation";

export const EndTestModule: FC = (): ReactElement => {
  const { getStudent } = useStudentData();

  const selectionType = useMemo(() => {
    return getStudent?.selection_path_id;
  }, [getStudent?.selection_path_id]);

  const router = useRouter();

  useEffect(() => {
    if (
      getStudent?.selection_path_id !== 3 ||
      !getStudent?.payment?.find((payment) => payment.name === "PMB")?.isPaid
    ) {
      redirect("/dashboard", RedirectType.replace);
    }
  });

  if (localStorage.getItem("selectedAnswer") && Number(localStorage.getItem("minutes")) !== 0) {
    router.push("/dashboard/selection/quiz");
  }

  if (!getStudent?.test_score) {
    router.push("/dashboard/selection");
  }

  return (
    <section
      key="endtest"
      className="flex flex-col w-full h-full justify-center items-center overflow-y-auto"
    >
      {/* header */}
      <div className="w-[80%] lg:w-full flex flex-col justify-start items-start">
        <h1 className="text-slate-5">
          PMB <span className="text-secondary-green-4"> / Seleksi Test</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Seleksi Test</p>
      </div>

      {/* body */}
      <div className="w-[80%] lg:w-full relative rounded-lg h-full md:h-[30rem] lg:h-[27rem] xl:h-[83vh] xl:w-full bg-primary-white  2xl:w-full 2xl:h-[84vh] flex items-center p-2 lg:p-16 mt-4 md:mt-0">
        <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center ">
          {/* Image */}
          <figure className="w-full lg:w-1/2 relative ">
            <Image
              src={"/illustrations/endTestImage.webp"}
              alt="home"
              width={292}
              height={292}
              quality={100}
              priority
              className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] xl:w-[300px] xl:h-[300px] 2xl:w-[350] 2xl:h-[350px] mx-auto lg:mx-0  object-cover"
            />
          </figure>

          {/* heading */}
          <div className="flex flex-col gap-y-2 items-center shadow-[0px_4px_8px_0px_rgba(0, 0, 0, 0.1)] text-center ">
            <h1 className="font-extrabold text-2xl lg:text-3xl w-full">Terima kasih</h1>
            <div className="w-full">
              <h2 className="lg:text-base xl:text-lg">
                Telah Mengikuti Seleksi Test <br />{" "}
                <span className="text-primary-green font-semibold">
                  PMB Universitas Islam Nusanatra
                </span>
              </h2>
              <h3 className="mt-4">Selamat istirahat dan tetap semangat!</h3>
            </div>
          </div>
        </div>
      </div>

      {selectionType === 3 && (
        <RedirectLink link="/dashboard/registrasi/pembayaran/detail">
          Lanjut Pembayaran
        </RedirectLink>
      )}
    </section>
  );
};

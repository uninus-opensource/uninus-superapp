"use client";
import { FC, ReactElement, useEffect, useState } from "react";
import { Button } from "../../atoms";
import { TButtonSection } from "./type";

export const TabJalurSeleksi: FC = (): ReactElement => {
  const [isActive, setIsActive] = useState<number>(1);

  const buttonList: TButtonSection[] = [
    {
      no: 1,
      item: "SPA",
    },
    {
      no: 2,
      item: "SPNA",
    },
    {
      no: 3,
      item: "ST",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (isActive <= 3) {
        setIsActive(isActive + 1);
      }
    }, 9000);
    if (isActive > 3) {
      setIsActive(1);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section
      data-testid="Tab"
      className="flex flex-col gap-6 lg:p-6 lg:w-7/12 xl:w-8/12 w-auto items-center"
    >
      <h1
        className=" border-black uppercase text-primary-white bg-secondary-green-4 rounded-lg
          text-2xl font-bold p-4 text-center w-5/6 my-8"
      >
        jalur seleksi pmb uninus
      </h1>
      <div className="flex flex-col gap-4 border-2 border-secondary-green-4 rounded-lg h-80 lg:w-full md:w-full w-[350px] p-5 ">
        <div className="border-2 border-secondary-green-4 rounded-lg h-auto px-4 lg:px-8 gap-2 lg:gap-4 p-2 flex justify-between">
          {buttonList.map((list, idx) => (
            <Button
              key={idx}
              size="sm"
              styling="text-left text-xl leading-4"
              width="lg:w-[400px] w-[150px]"
              height="h-full"
              onClick={() => setIsActive(list.no)}
              variant={isActive === list.no ? "filled" : "text-icon"}
            >
              {list.item}
            </Button>
          ))}
        </div>
        <div data-testid="content-text" className="flex flex-col justify-center gap-2 text-sm">
          <h1 className="text-xl font-bold">Persyaratan</h1>

          <p data-testid="content-1" className={isActive === 1 ? "block" : "hidden"}>
            1. Nilai Rapor Rata-rata ≥ 70 untuk 3 Mata Pelajaran (Matematika, Bahasa Inggris &
            Bahasa Indonesia) semester 1 s.d semester 4 bagi siswa kelas XII Angkatan 2022/2023 dan
            semester 1 s.d semester 6 bagi siswa Angkatan sebelumnya
            <br />
            <br />
            2. Nilai UTBK atau hasil SBMPTN/SNBT Rata-rata ≥ 450
          </p>
          <p data-testid="content-2" className={`mt-2 ${isActive === 2 ? "block" : "hidden"}`}>
            Prestasi/Juara lomba dibidang akademik atau non akademik yang pernah diraih oleh calon
            mahasiswa ketika duduk di bangku SMA/SMK/MA atau setelah lulus, dengan standar prestasi
            minimal Juara 3 di perlombaan tingkat Kota/Kabupaten dan bagi penghafal Qur'an (Tahfidz)
          </p>
          <p data-testid="content-3" className={`mt-4 ${isActive === 3 ? "block" : "hidden"}`}>
            Jalur seleksi berdasarkan hasil test, dengan standar kelulusan passing grade sebesar 60
          </p>
        </div>
      </div>
    </section>
  );
};

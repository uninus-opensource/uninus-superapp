import { FC, ReactElement, useEffect, useState } from 'react';
import { Button } from '../../atoms';
import { TButtonSection } from './type';

export const TabJalurSeleksi: FC = (): ReactElement => {
  const [isActive, setIsActive] = useState<number>(1);

  const buttonList: TButtonSection[] = [
    {
      no: 1,
      item: 'Jalur Seleksi Prestasi Akademik (JSPA)',
    },
    {
      no: 2,
      item: 'Jalur Seleksi Prestasi Non-Akademik (JSPNA)',
    },
    {
      no: 3,
      item: 'Jalur Seleksi Test (JST)',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (isActive <= 3) {
        setIsActive(isActive + 1);
      }
    }, 2400);
    if (isActive > 3) {
      setIsActive(1);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  return (
    <section className="flex flex-col gap-6 p-6 w-8/12 items-center">
      <h1
        className=" border-black uppercase font-bebasNeue text-primary-white bg-secondary-green-4 rounded-lg 
          text-2xl font-extramedium p-4 text-center w-5/6"
      >
        jalur seleksi pmb uninus
      </h1>
      <div className="flex flex-col gap-4 border-2 border-secondary-green-4 rounded-lg h-80 w-full p-5 ">
        <div className="border-2 border-secondary-green-4 rounded-lg h-24 p-2 flex gap-2">
          {buttonList.map((list, idx) => (
            <Button
              key={idx}
              size="sm"
              styling="text-left leading-4"
              height="h-full"
              onClick={() => setIsActive(list.no)}
              variant={isActive === list.no ? 'filled' : 'text-icon'}
            >
              {list.item}
            </Button>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2 text-sm">
          <h1 className="text-xl font-extramedium font-bebasNeue">
            Persyaratan
          </h1>

          <p className={isActive === 1 ? 'block' : 'hidden'}>
            1. Nilai Rapor Rata-rata ≥ 70 untuk 3 Mata Pelajaran (Matematika,
            Bahasa Inggris & Bahasa Indonesia) semester 1 s.d semester 4 bagi
            siswa kelas XII Siswa Angkatan 2022/2023 dan semester 1 s.d semester
            <br />
            <br />
            2. Nilai UTBK atau hasil SBMPTN/SNBT Rata-rata ≥ 450
          </p>
          <p className={`mt-2 ${isActive === 2 ? 'block' : 'hidden'}`}>
            Prestasi/Juara lomba dibidang akademik atau non akademik yang pernah
            diraih oleh calon mahasiswa ketika duduk di bangku SMA/SMK/MA atau
            setelah lulus, dengan standar prestasi minimal Juara 3 di perlombaan
            tingkat Kota/Kabupaten dan bagi penghapal alquran (Tahfidz)
          </p>
          <p className={`mt-4 ${isActive === 3 ? 'block' : 'hidden'}`}>
            Jalur seleksi berdasarkan hasil test, dengan standar kelulusan
            passing grade sebesar 60
          </p>
        </div>
      </div>
    </section>
  );
};

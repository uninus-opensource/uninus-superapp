import { Button } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import Image from "next/image";

export const DetailSection: FC = (): ReactElement => {
  const detailUninus = () => {
    window.open("https://uninus.ac.id/", "_blank");
  };
  return (
    <section className="flex flex-col lg:flex-row h-auto w-full gap-14 lg:gap-0 lg:mt-32 justify-center items-center mb-14">
      <section className="h-auto gap-4 lg:pl-16 px-16 lg:px-0 py-2">
        {/* Gambar */}
        <figure>
          <Image
            src={"/illustrations/foto-mahasiswa-bareng-reactangle.webp"}
            width={500}
            height={500}
            quality={100}
            priority
            alt="talent"
          />
        </figure>
      </section>
      {/* sesi text */}
      <section className="flex flex-col lg:w-2/4 w-full px-12 gap-4 xl:gap-8">
        <h1 className="uppercase text-primary-green text-left text-2xl lg:text-4xl font-bold ">
          tentang <span className="text-secondary-green-4">uninus</span>
        </h1>
        <div className="flex flex-col gap-4 font-medium">
          <p className="text-justify">
            Universitas Islam Nusantara adalah Perguruan tinggi Islam Ahlussunnah Wal Jama`ah
            An-Nahdliyah di Kota Bandung. Universitas ini memiliki fasilitas pendidikan yang modern
            dan menawarkan berbagai program studi di bidang ilmu sosial, teknologi, bisnis, dan
            keislaman.
          </p>
          <p className="text-justify">
            Universitas Islam Nusantara juga memiliki komunitas mahasiswa yang aktif dan beragam,
            yang membantu membentuk lingkungan belajar yang berkualitas dan inklusif.
          </p>
        </div>
        <div>
          <Button
            variant="filled-tonal"
            styling="font-semibold rounded-md text-base"
            height="h-9"
            onClick={detailUninus}
          >
            Detail Uninus
          </Button>
        </div>
      </section>
    </section>
  );
};

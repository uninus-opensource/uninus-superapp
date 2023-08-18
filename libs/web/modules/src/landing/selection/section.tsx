import { TabJalurSeleksi } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import Image from "next/image";

export const SelectionSection: FC = (): ReactElement => {
  return (
    <section className="my-32 h-auto w-full gap-4 lg:px-16 px-8 py-2 flex lg:flex-row flex-col justify-between xl:justify-evenly items-center ">
      <figure className="relative lg:bottom-11 xl:bottom-14 2xl:bottom-20 mx-8 lg:mx-0">
        <Image
          src={"/illustrations/talent2.svg"}
          priority
          alt="mahasiswi-1"
          width={700}
          height={700}
          quality={100}
          className="sm:w-[30rem] mb-12 lg:mb-0"
        />
      </figure>
      <TabJalurSeleksi />
    </section>
  );
};

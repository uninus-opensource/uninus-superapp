import { TabJalurSeleksi } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import Image from "next/image";

export const SelectionSection: FC = (): ReactElement => {
  return (
    <section className="my-32 h-auto w-full gap-4 lg:px-16 px-8 py-2 flex lg:flex-row  flex-col justify-between xl:justify-evenly items-center ">
      <figure className="mt-4 mx-8 lg:mx-0">
        <Image
          src={"/illustrations/talent11.webp"}
          priority
          alt="mahasiswi-1"
          width={400}
          height={400}
          quality={100}
        />
      </figure>
      <TabJalurSeleksi />
    </section>
  );
};

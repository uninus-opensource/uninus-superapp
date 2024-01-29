"use client";
import { Card } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import {
  AiFillStar,
  AiFillSafetyCertificate,
  AiFillTags,
  AiFillEnvironment,
  AiFillTrophy,
} from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { TBenefit } from "./type";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { NeoTypography } from "@uninus/ui-atoms";

const CardBenerfit: TBenefit[] = [
  {
    icon: <AiFillStar />,
    title: "Kampus pilihan",
    desc: (
      <NeoTypography size="body-2">
        {" "}
        <span className="text-secondary-green-4 font-bold">Peringkat 6 </span>
        Kampus NU terbaik se - Indonesia,{" "}
        <span className="text-secondary-green-4 font-bold">10 Terbaik </span> se - Kota Bandung dan{" "}
        <span className="text-secondary-green-4 font-bold">99 Kampus Terbaik </span>
        se - Indonesia
      </NeoTypography>
    ),
  },
  {
    icon: <AiFillSafetyCertificate />,
    title: "Terakreditasi",
    desc: (
      <NeoTypography size="body-2">
        Seluruh Program Studi di UNINUS yang Terakreditasi BAN - PT mendapatkan Rata - rata
        Penilaian <span className="text-secondary-green-4 font-bold">{`"Baik Sekali"`}</span>
      </NeoTypography>
    ),
  },
  {
    icon: <AiFillTags />,
    title: "Biaya Terjangkau",
    desc: (
      <NeoTypography size="body-2">
        <span className="text-secondary-green-4 font-bold">Biaya Kuliah Terjangkau </span>
        dengan{" "}
        <span className="text-secondary-green-4 font-bold">berbagai Kemudahan Pembiayaan</span>
      </NeoTypography>
    ),
  },
  {
    icon: <AiFillEnvironment />,
    title: "Lokasi Strategis",
    desc: (
      <NeoTypography size="body-2">
        <span className="text-secondary-green-4 font-bold">Akses Transportasi mudah</span> dan
        lokasi kampus berada{" "}
        <span className="text-secondary-green-4 font-bold">pusat Kota Bandung</span>
      </NeoTypography>
    ),
  },
  {
    icon: <AiFillTrophy />,
    title: "Pilihan Beasiswa",
    desc: (
      <NeoTypography size="body-2">
        <span className="text-secondary-green-4 font-bold">Terdapat berbagai Beasiswa Pilihan</span>{" "}
        Nusantara Unggul, Nusantara Berprestasi dan Mitra Nusantara
      </NeoTypography>
    ),
  },
  {
    icon: <BiSolidUser />,
    title: "Dosen Berpengalaman",
    desc: (
      <NeoTypography size="body-2">
        Dosen{" "}
        <span className="text-secondary-green-4 font-bold">Lulusan Universitas Terkemuka</span> di{" "}
        <span className="text-secondary-green-4 font-bold">Indonesia & Luar Negeri</span> yang
        berpengalaman dalam bidangnya.
      </NeoTypography>
    ),
  },
];

const cardProps = {
  items: CardBenerfit.map((x, i) => (
    <div key={i} className="flex h-full p-4">
      <Card key={i} icon={x.icon} cardTitle={x.title} height="h-48">
        <div className="text-xs sm:text-sm">{x.desc}</div>
      </Card>
    </div>
  )),
  responsive: {
    0: {
      items: 1,
    },
    640: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  },
  autoPlay: true,
  autoPlayInterval: 3000,
  animationDuration: 1000,
  infinite: true,
  disableButtonsControls: true,
};

export const BenefitSection: FC = (): ReactElement => {
  return (
    <section className="mt-10 lg:mt-32 h-full w-full gap-1 lg:px-16 px-4 py-2 flex flex-col items-center">
      <NeoTypography
        size="subtitle-1"
        color="text-secondary-green-4"
        variant="bold"
        sizeResponsiveLG="title-5"
      >
        Kenapa Harus Kuliah di <span className="text-primary-yellow">UNINUS?</span>
      </NeoTypography>
      <section className="lg:grid hidden lg:grid-cols-3 lg:gap-10 gap-4 xl:gap-16">
        {CardBenerfit.map((x, i) => (
          <Card key={i} icon={x.icon} cardTitle={x.title}>
            {x.desc}
          </Card>
        ))}
      </section>

      <div className="lg:hidden w-full">
        <AliceCarousel key="benefit-carousel-landing" {...cardProps} />
      </div>
    </section>
  );
};

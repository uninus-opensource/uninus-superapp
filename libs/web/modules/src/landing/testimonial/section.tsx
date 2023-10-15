"use client";
import { CardImage } from "@uninus/web/components";
import { FC, ReactElement } from "react";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { TTestimonial } from "./type";
import "./style.css";
import Image from "next/image";

const CardTestimonial: TTestimonial[] = [
  {
    name: "Anisa",
    testimonial:
      "Saya sangat menghargai keragaman budaya di kampus ini. Ini adalah lingkungan yang inklusif dan ramah bagi semua orang.",
    image: "/illustrations/testi1.webp",
    job: "Fashion Styles (Digital Talent)",
    faculty: "Fakultas Ilmu Komunikasi",
  },
  {
    name: "Putri",
    testimonial:
      "Saya merasa beruntung telah mengambil jurusan hukum di universitas dan membangun karier sebagai Konsultan Hukum.",
    image: "/illustrations/testi2.webp",
    job: "Konsultan Hukum",
    faculty: "Fakultas Hukum",
  },
  {
    name: "Herman",
    testimonial:
      "Pendidikan yang saya terima di fakultas ini telah membekali saya dengan dasar-dasar yang kokoh dalam teknologi dan rekayasa sistem.",
    image: "/illustrations/testi3.webp",
    job: "DevOps Engineer",
    faculty: "Fakultas Teknik",
  },
  {
    name: "Afifah",
    testimonial:
      "Pendidikan saya di jurusan ekonomi memberikan fondasi yang kuat dalam analisis ekonomi, yang menjadi kunci dalam pekerjaan saya.",
    image: "/illustrations/testi4.webp",
    job: "Auditor Keuangan",
    faculty: "Fakultas Keuangan",
  },
];

export const TestimonialSection: FC = (): ReactElement => {
  const cardProps = {
    items: CardTestimonial.map((x, i) => (
      <div key={i} className="flex h-full p-2 mx-[5vw] md:mx-0">
        <CardImage>
          <div className="image-cap flex flex-col justify-end">
            <figure className="relative">
              <Image
                src={`${x.image}`}
                alt={`${x.name}`}
                width={300}
                height={300}
                className="w-full "
              />
            </figure>
            <figcaption className="absolute p-2 w-full text-lg md:text-xs lg:text-md bg-primary-black bg-opacity-20 text-primary-white">
              <p className="font-extrabold ">{x.name}</p>
              <p className="font-medium">{x.job}</p>
              <p className="font-medium">{x.faculty}</p>
            </figcaption>
          </div>
          <div className="testimonial p-4 text-center mt-3 text-secondary-green-4 font-medium h-[13rem]">
            <p className="text-4xl  text-primary-green font-bold">”</p>
            <p>{x.testimonial}</p>
          </div>
        </CardImage>
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
    disableDotsControls: true,
  };
  return (
    <section className="lg:mt-32 h-full w-full gap-4 lg:px-16 px-4 py-2 flex flex-col items-center ">
      <h1 className="p-5 text-2xl text-center lg:text-4xl text-secondary-green-4 font-bold">
        Apa Kata <span className="text-primary-green">Mereka</span>
      </h1>

      <div className=" w-full xl:w-70%">
        <AliceCarousel key="benefit-carousel-landing" {...cardProps} />
      </div>
    </section>
  );
};

'use client'
import Image from "next/image";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { FC, ReactElement } from "react";
import Link from "next/link";

export const PsuWebModule: FC = () : ReactElement => {

const techStack = [{image : "/illustrations/figma.webp", title : "Figma", desc : "UI/UX Design"},
{image : "/illustrations/next.webp", title : "Next.Js 13", desc : "Front-End"},
{image : "/illustrations/typescript.webp", title : "Typescript", desc : "Front-End & Back-End"},
{image : "/illustrations/tailwind.webp", title : "Tailwindcss", desc : "Framework CSS"},
{image : "/illustrations/nx.webp", title : "Nx", desc : "Build System Monorepo"},
{image : "/illustrations/nestJs.webp", title : "Nest.Js", desc : "Back-End"},
{image : "/illustrations/prisma2.webp", title : "Prisma", desc : "Object Relation Model"},
{image : "/illustrations/postgreSQL.webp", title : "PostgreSQL", desc : "Database"}]

const cardProps = {
  items: techStack.map((tech, i) => (
    <div key={i} className="px-2 py-2 mt-4 sm:px-4 sm:mt-6 md:px-6 md:mt-8">
      <div className="flex justify-center items-center w-contain h-[120px] p-[4px] bg-[#FFFFFF] drop-shadow-md rounded-xl sm:h-[240px] md:h-[400px]">
        <div className="flex flex-col gap-y-3 sm:gap-y-8 md:gap-y-16">
          <figure>
            <Image
              src={`${tech.image}`}
              alt={`${tech.title}`}
              objectFit="contain"
              width={40}
              height={40}
              className="mx-auto sm:w-[80px] md:w-[160px]"
            />
          </figure>
          <figcaption className="flex flex-col items-center gap-y-1 sm:gap-y-2 md:gap-y-4 ">
            <p className="text-primary-600 font-extrabold text-[10px] sm:text-base md:text-2xl">{tech.title}</p>
            <p className="font-medium text-[10px] text-center sm:text-sm md:text-base">{tech.desc}</p>
          </figcaption>
        </div>
      </div>
    </div>
  )),
  responsive: {
    0: {
      items: 3,
    },
    640: {
      items: 3,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 3,
    },
  },
  autoPlay: false,
  autoPlayInterval: 3000,
  animationDuration: 1000,
  infinite: true,
  disableButtonsControls: false,
  disableDotsControls: true
};
  return (
    <>
      <header>
        <div id="circle" className="absolute top-[-200px] left-[-160px] w-[295px] h-[295px] rounded-full bg-primary-500 blur-[88px]"></div>
        <nav className="w-full flex relative justify-between px-[24px] py-[60px] z-10 sm:px-[40px] md:px-[80px]">
          <figure>
            <figcaption className="text-4xl font-bold">PSU</figcaption>
          </figure>
          <ul className="invisible font-medium sm:visible flex gap-x-12 text-2xl">
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
          </ul>
          
        </nav>
      </header>
      <section className="font-body min-w-full min-h-screen">
          <div id="welcome" className="w-full h-contain flex justify-between items-center px-[24px] sm:px-[40px] md:px-[80px]">
              <span className="flex flex-col gap-y-6">
                <span className="text-4xl sm:text-[40px] md:text-6xl">
                  <p className="font-bold">PEMUDA S******</p>
                  <p className="text-primary-600 font-medium">UNIVERSE</p> 
                </span>
                <span>
                  <p className="text-base font-medium md:text-2xl">Software House Based On Bandung</p> 
                </span>
              </span>
              <figure className="hidden sm:block">
                <Image
                  src={"/illustrations/Maul.webp"}
                  alt="Maulana"
                  width={263}
                  height={272}
                  priority
                  quality={100}
                  className="lg:w-[467px] lg:h-[483px]"
                />
              </figure>
          </div>
          <div id="circle" className="absolute top-[320px] sm:top-[520px] -right-[140px] sm:-right-[160px] w-[200px] h-[200px] rounded-full bg-primary-500 blur-[88px]"></div>
          <div id="techStack" className="w-full h-contain flex flex-col justify-center items-center mt-[60px] px-[24px] relative z-10 sm:px-[40px] md:px-[80px]">
            <h1 className="text-base font-semibold sm:text-2xl md:text-[40px]"><span className="text-primary-600">Tech Stack</span> We Used</h1>
            <AliceCarousel {...cardProps}/>
          </div>
          <div id="ourProjects" className="w-full h-contain flex flex-col justify-center items-center px-[24px] mt-10 gap-y-8 relative z-10 sm:px-[40px] md:px-[80px]">
            <h1 className="text-base font-semibold sm:text-2xl md:text-[40px]"><span className="text-primary-600">Our</span> Projects</h1>
            <div className="w-full h-contain flex flex-col items-center bg-[url('/illustrations/uninus.webp')] bg-no-repeat bg-cover px-[44px] py-[24px] rounded-xl text-grayscale-50 gap-y-1 sm:px-[118px] sm:py-[64px] md:py-[60px] md:gap-y-3">
              <h1 className="text-xs font-semibold sm:text-2xl md:text-3xl">NEO Universitas Islam Nusantara</h1>
              <p className="text-xs font-medium sm:text-base md:text-xl">New Digitalization Monorepo</p>
            </div>
          </div>
          <div id="circle" className="absolute -bottom-[360px] sm:-bottom-[620px] md:-bottom-[1000px] right-[320px] sm:right-[680px] md:-left-60 w-[395px] h-[395px] rounded-full bg-primary-500 blur-[88px]"></div>
      </section>
        <footer className="w-full h-contain flex flex-col relative items-center bg-primary-950 px-[24px] py-[70px] mt-[20px] z-10 gap-y-9 sm:mt-[160px]">
          <h1 className="text-[#FFFFFF] text-base font-bold sm:text-2xl">Pemuda S****** Universe</h1>
          <span className="flex flex-col items-center text-[#DDDDDD] text-sm font-medium sm:text-xl">
            <p>Copyright © 2023 PSU</p>
            <p>All rights reserved Pemuda S****** Universe</p>
          </span>
          <div className="flex gap-x-4">
            <Image className="sm:w-[32px] md:w-[40px]"
              src={"/illustrations/facebook.webp"}
              alt="Facebook"
              width={24}
              height={24}
              priority
              quality={100}
            />
            <Image className="sm:w-[32px] md:w-[40px]"
              src={"/illustrations/twitter.webp"}
              alt="Twitter"
              width={24}
              height={24}
              priority
              quality={100}
            />
            <Image className="sm:w-[32px] md:w-[40px]"
              src={"/illustrations/linkedin.webp"}
              alt="LinkedIn"
              width={24}
              height={24}
              priority
              quality={100}
            />
            <Image className="sm:w-[32px] md:w-[40px]"
              src={"/illustrations/instagram.webp"}
              alt="Instagram"
              width={24}
              height={24}
              priority
              quality={100}
            />
          </div>
        </footer>
    </>
  );
}

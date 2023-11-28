'use client'
import Image from "next/image";
import Link from "next/link";
import { FC, ReactElement } from "react";


export const PsuAboutModule: FC = () : ReactElement => {
    return (
        <>
          <header>
            <div id="circle" className="absolute -top-[200px] left-[-160px] w-[295px] h-[295px] rounded-full bg-primary-500 blur-[88px]"></div>
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
            <div id="aboutUs" className="w-full h-contain flex flex-col items-center px-[24px] sm:px-[40px] md:px-[80px]">
                <div id="circle" className="absolute top-[320px] sm:top-[460px] -right-[320px] sm:-right-[260px] w-[300px] h-[300px] rounded-full bg-primary-500 blur-[88px]"></div>
                <figure className="bg-[#FFFFFF] p-3 sm:p-5 drop-shadow-md rounded-lg absolute -rotate-[20deg] left-10 sm:left-16 md:left-24">
                  <Image 
                    src={"/illustrations/vscode.webp"}
                    alt={"VS Code"}
                    width={48}
                    height={48}
                    quality={100}
                    className="sm:w-[72px] md:w-[88px]"
                  />
                </figure>
                <figure className="bg-[#FFFFFF] p-2 sm:p-3 drop-shadow-md rounded-lg absolute rotate-[20deg] right-10 sm:right-14 md:right-20 top-48">
                  <Image 
                    src={"/illustrations/terminal.webp"}
                    alt={"VS Code"}
                    width={44}
                    height={44}
                    quality={100}
                    className="sm:w-[60px] md:w-[76px]"
                  />
                </figure>
                <span className="flex flex-col text-center gap-y-4 z-10 sm:gap-y-5 md:gap-y-8 mt-[100px] sm:mt-[140px] md:mt-[160px]">
                    <h1 className="text-lg font-bold sm:text-2xl md:text-4xl">About <span className="text-primary-600">Us</span></h1>
                    <p className="text-[10px] text-grayscale-900 font-medium sm:px-[40px] md:px-[150px] sm:text-base md:text-xl">Perusahaan inovatif yang mengkhususkan diri dalam pengembangan teknologi terutama di bidang pembuatan platform website.
                        Dengan komitmen untuk menghadirkan solusi digital terbaik, perusahaan kami menjadi mitra pilihan bagi bisnis yang ingin
                        mengoptimalkan kehadiran online mereka dan menciptakan pengalaman digital yang luar biasa.</p>
                </span>
            </div>
            <figure className="absolute bg-[#FFFFFF] p-2 sm:p-4 drop-shadow-md rounded-lg rotate-[16deg] left-12 sm:left-20 md:left-24 mt-8">
              <Image
                src={"/illustrations/codeBracket.webp"}
                alt={"VS Code"}
                width={36}
                height={36}
                quality={100}
                className="sm:w-[48px] md:w-[60px]"
               />
            </figure>
            <div id="ourTeam" className="w-full h-contain flex flex-col justify-center mt-[160px] px-[24px] relative z-10 sm:px-[40px] md:px-[80px] md:mt-[200px]">
                <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Meet <span className="text-primary-600">Our Team</span></h1>
                <div className="grid grid-cols-4 grid-rows-4 mt-6 gap-6 relative z-10 sm:mt-12 md:mt-16">
                  <figure>
                    <Image 
                      src={"/illustrations/member/1Maulana.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Maulana Sodiqin</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">CEO</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/1Fenny.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Fenny Oktaviani</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Quality Assurance</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/1Alya.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Alya Ningrum</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Quality Assurance</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/1Ayu.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Ayu Sri Rahayu</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Administration</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/2Rizal.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Rizal Syaepulloh</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">UI/UX Design</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/2Aldo.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Aldo Fariz Fadilla</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">UI/UX Design</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/2Astie.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Astie Noer Hadiyanti</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">UI/UX Design</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/2Ajid.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Ajid Jakaria Yahya</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">UI/UX Design</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/3Randika.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Randika</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Front-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/3LutfhiR.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">M Luthfi Ramadhan</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Front-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/3LutfhiA.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Luthfi Ahmad Fauzi</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Front-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/3Rohendo.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Rohendo Junaedin</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Front-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/4Fahmi.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">M Nurfahmi Sugiarto</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Back-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/4Rian.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Rian Ihsan Ardiansyah</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Back-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                  <figure>
                    <Image 
                      src={"/illustrations/member/4Yusron.webp"}
                      alt={"Maulana"}
                      width={60}
                      height={60}
                      quality={100}
                      className="sm:w-[80px] md:w-[160px]"
                    />
                    <figcaption className="flex flex-col mt-3 gap-y-2 sm:mt-6">
                      <p id="name" className="text-[10px] font-bold text-primary-600 sm:text-sm md:text-xl">Yusron Fauzan Nasrullah</p>
                      <p id="position" className="text-[10px] font-medium sm:text-xs md:text-lg">Back-End</p>
                      <p id="linkedinButton" className="text-[10px]">Check Bio</p>
                    </figcaption>
                  </figure>
                </div>
                <div id="circle" className="absolute -bottom-[360px] sm:-bottom-[440px] md:-bottom-[500px] right-[320px] sm:right-[640px] md:-left-60 w-[395px] h-[395px] rounded-full bg-primary-500 blur-[88px]"></div>
            </div>
          </section>
            <footer className="w-full h-contain flex flex-col items-center bg-primary-950 px-[24px] py-[70px] mt-[80px] sm:mt-[180px] md:mt-[240px] gap-y-9 relative z-10">
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
"use client";
import { ReactElement, FC, Fragment, useState, useEffect, useCallback } from "react";
import { HeroSection } from "./hero";
import { WelcomeSection } from "./banner-welcome";
import { BenefitSection } from "./benefit";
import { SelectionSection } from "./selection";
import { ProgramSection } from "./program-study";
import { DetailSection } from "./detail";
import { Button, Footer, Navbar, PopUp } from "@uninus/web/components";
import { BsCalendarCheck, BsTelephone } from "react-icons/bs";
import { motion } from "framer-motion";
import { FaCircleUser } from "react-icons/fa6";

export const LandingModule: FC = (): ReactElement => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPopUp, setIsPopUp] = useState<boolean>(false);

  const callCenter = () => {
    window.open("https://wa.me/6289694313743", "_blank");
  };

  const listenToScroll = useCallback(() => {
    const heightToHide = 300;
    const heightToHideFooter = 3400;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHide) {
      if (winScroll > heightToHideFooter) {
        setIsVisible(true);
        setIsPopUp(false);
      } else {
        isVisible && setIsVisible(false);
      }
    } else {
      setIsVisible(true);
      setIsPopUp(false);
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, [listenToScroll]);

  return (
    <Fragment>
      <Navbar />
      <main className="w-full min-h-screen overflow-x-hidden bg-slate-2">
        <HeroSection />
        <WelcomeSection />
        <BenefitSection />
        <SelectionSection />
        <ProgramSection />
        <DetailSection />

        {/* Floating Button */}
        <motion.button
          style={{
            x: 400,
            y: isPopUp ? -105 : 0,
            rotate: 0,
          }}
          animate={{
            x: isVisible ? [0, 400] : [400, 0],
            rotate: isPopUp ? [0, 200, 360] : [360, 0],
          }}
          className={`fixed flex items-center justify-center transition-transform bottom-24 md:bottom-28 right-9 md:right-10 xl:right-12 z-50 group bg-primary-green rounded-full h-10 w-10 md:h-12 md:w-12 active:bg-secondary-green-1 duration-75`}
          onClick={() => setIsPopUp(!isPopUp)}
        >
          <BsTelephone className="-rotate-90 text-xl duration-200 text-primary-white font-bold " />
        </motion.button>

        <motion.button
          style={{
            x: 500,
          }}
          animate={{
            x: isVisible ? [0, 500] : [500, 0],
          }}
          className={`fixed flex flex-col gap-1 items-center justify-center transition-transform bottom-6 right-6 xl:right-8 z-50 group bg-primary-green rounded-full h-16 w-16 md:h-20 md:w-20 active:bg-secondary-green-1 duration-75`}
        >
          <BsCalendarCheck className="text-primary-white text-2xl md:text-3xl" />
          <span className="text-[8px] md:text-[10px] font-bold text-primary-white leading-none">
            Cek <br /> Kelulusan
          </span>
        </motion.button>

        {/* PopUp CallCenter */}
        <PopUp
          header={
            <div className="flex w-full h-full justify-start gap-4 text-primary-white items-center px-5">
              <FaCircleUser className="h-6 w-6" />
              <p className="font-semibold text-xs sm:text-sm md:text-lg">Call Center UNINUS</p>
            </div>
          }
          position="fixed bottom-2 md:bottom-6 right-24 md:right-32"
          className="flex flex-col items-center justify-between pt-8 pb-6"
          showPopUp={isPopUp}
        >
          <div className="border-2 border-primary-green rounded-lg w-[60vw] sm:w-[18em] lg:w-[19em] h-[4.5em] flex justify-center items-center p-4">
            <p className="text-[9px] sm:text-[10px] md:text-xs text-secondary-green-1 font-semibold">
              {`"`}Ingin informasi cepat tentang pendaftaran, program studi, atau fasilitas kampus?
              Call center kami, siap membantumu!{`"`}
            </p>
          </div>
          <Button size="sm" height="h-5" styling="text-xs" onClick={callCenter}>
            Hubungi Kami
          </Button>
        </PopUp>
      </main>
      <Footer />
    </Fragment>
  );
};

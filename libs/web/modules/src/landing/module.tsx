"use client";
import { ReactElement, FC, Fragment } from "react";
import { HeroSection } from "./hero";
import { WelcomeSection } from "./banner-welcome";
import { BenefitSection } from "./benefit";
import { SelectionSection } from "./selection";
import { ProgramSection } from "./program-study";
import { DetailSection } from "./detail";
import { Footer, Navbar } from "@uninus/web/components";
import { ModalAndButtons } from "./modal-floatingbutton";
import { TestimonialSection } from "./testimonial";
import { NewsSection } from "./news";

export const LandingModule: FC = (): ReactElement => {
  return (
    <Fragment key="landing">
      <Navbar />
      <main className="w-full min-h-screen overflow-x-hidden bg-slate-2">
        <HeroSection />
        <WelcomeSection />
        <BenefitSection />
        <SelectionSection />
        <ProgramSection />
        <DetailSection />
        <TestimonialSection />
        <NewsSection />
        <ModalAndButtons />
      </main>
      <Footer />
    </Fragment>
  );
};

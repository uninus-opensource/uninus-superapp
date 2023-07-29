'use client';
import { ReactElement, FC, Fragment } from 'react';
import { HeroSection } from './hero';
import { WelcomeSection } from './banner-welcome';
import { BenefitSection } from './benefit';
import { SelectionSection } from './selection';
import { ProgramSection } from './program-study';
import { DetailSection } from './detail';
import { Footer, Navbar } from '@uninus/web/components';
import { useSession } from "next-auth/react";

export const LandingModule: FC = (): ReactElement => {
  const data = useSession();
  console.log(data)
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
      </main>
      <Footer />
    </Fragment>
  );
};

'use client';
import { ReactElement, FC } from 'react';
import { HeroSection } from './hero';
import { MainLayout } from '../layouts';
import { WellcomeSection } from './banner-wellcome';
import { BenefitSection } from './benefit';
import { SelectionSection } from './selection';
import { ProgramSection } from './program-study';
import { DetailSection } from './detail';

export const LandingModule: FC = (): ReactElement => {
  return (
    <MainLayout>
      <main className="w-full min-h-screen overflow-x-hidden bg-slate-2">
        <HeroSection />
        <WellcomeSection />
        <BenefitSection />
        <SelectionSection />
        <ProgramSection />
        <DetailSection />
      </main>
    </MainLayout>
  );
};

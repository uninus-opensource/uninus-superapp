'use client';
import { ReactElement, FC } from 'react';
import { HeroSection } from './hero';
import { WellcomeSection } from './banner-wellcome';
import { BenefitSection } from './benefit';
import { SelectionSection } from './selection';
import { ProgramSection } from './program-study';
import { DetailSection } from './detail';
import { lazily } from 'react-lazily';
const { MainLayout } = lazily(() => import('../layouts'));

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

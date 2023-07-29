"use client";
import { FC, ReactElement } from 'react';
import { LoadingSpinner } from '../spinner';

export const LazyLoading: FC = (): ReactElement => {
  return (
    <section className="w-screen bg-slate-2 h-screen flex justify-center items-center">
      <LoadingSpinner className="w-10 h-10 md:w-20 md:h-20" />
    </section>
  );
};

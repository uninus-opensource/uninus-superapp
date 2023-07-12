'use client';
import { LoadingSpinner } from '@uninus/components';

export default function Loading() {
  return (
    <section className="flex bg-slate-2 h-screen w-screen justify-center items-center">
      <LoadingSpinner />
    </section>
  );
}

"use client";
import { ReactElement, FC } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Table } from "./table";

export const ModuleKelolaPertanyaan: FC = (): ReactElement => {
  const { data: session } = useSession();

  if (session?.user.role !== "Super Admin PMB") {
    redirect("/dashboard");
  }
  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          PMB <span className="text-secondary-green-4"> / Kelola Pertanyaan</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Kelola Pertanyaan</p>
      </div>
      <Table />
    </section>
  );
};

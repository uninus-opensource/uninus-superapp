"use client";
import { ReactElement, FC } from "react";
import Table from "./table";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const ModuleDataAkun: FC = (): ReactElement => {
  const { data: session } = useSession();

  if (session?.user.role !== "Super Admin PMB") {
    redirect("/dashboard");
  }

  return (
    <section className="flex flex-col text-center gap-y-6 lg:text-start">
      <div className="2xl:text-2xl">
        <h1 className="text-slate-5 ">
          Admin PMB <span className="text-secondary-green-4"> / Data Akun</span>
        </h1>
        <p className="text-lg 2xl:text-2xl font-bold text-secondary-green-4">Data Akun</p>
      </div>
      <Table />
    </section>
  );
};

"use client";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FC, ReactElement } from "react";
import { Button } from "@uninus/web/components";
import { useSearchParams } from "next/navigation";

export const ModuleVerifikasiBerhasil: FC = (): ReactElement => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <section className="flex flex-col items-center justify-center w-full h-full gap-4 p-12 lg:pt-20">
      <AiOutlineCheckCircle className="text-primary-green text-9xl" />
      <hgroup className="flex flex-col justify-center items-center font-semibold text-xl gap-3 text-center">
        <h3 className="text-3xl">Selamat</h3>
        <h3>
          Akun PMB Anda dengan email <span className="text-secondary-green-1">{email}</span> telah
          Berhasil Dibuat
        </h3>
      </hgroup>
      <Button variant="filled" href={`/auth/login?email=${email}`}>
        Lanjut Login
      </Button>
    </section>
  );
};

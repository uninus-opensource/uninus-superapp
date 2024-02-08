"use client";
import { TVSRegister, VSRegister } from "@uninus/entities";
import { Button, NeoTypography } from "@uninus/ui-atoms";
import { ControlledFieldCheckbox, ControlledFieldText } from "@uninus/ui-organisms";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const RegisterModule: FC = (): ReactElement => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<TVSRegister & { toc?: boolean }>({
    resolver: zodResolver(VSRegister),
    mode: "all",
  });
  return (
    <form className="flex flex-col h-full justify-center gap-y-3 w-full">
      <div className="flex flex-col">
        <NeoTypography color="text-grey-800" variant="bold" size="title-5">
          Daftar
        </NeoTypography>
        <NeoTypography color="text-grey-400" variant="reguler" size="body-1">
          Silahkan lengkapi form berikut untuk mendaftar
        </NeoTypography>
      </div>

      <div className="flex flex-col gap-y-1 w-full">
        <ControlledFieldText
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap"
          control={control}
          name="fullname"
          message={errors.fullname?.message}
          status={errors.fullname?.message ? "error" : "none"}
        />

        <div className="flex w-full gap-x-4 items-center justify-center">
          <ControlledFieldText
            label="Email"
            placeholder="Masukkan Email"
            control={control}
            name="email"
            message={errors.email?.message}
            status={errors.email?.message ? "error" : "none"}
          />
          <ControlledFieldText
            label="No. HP"
            placeholder="Masukkan No. HP"
            control={control}
            name="phoneNumber"
            message={errors.phoneNumber?.message}
            status={errors.phoneNumber?.message ? "error" : "none"}
          />
        </div>

        <div className="flex w-full gap-x-4 items-center justify-center">
          <ControlledFieldText
            type="password"
            label="Password"
            placeholder="Masukkan Password"
            control={control}
            name="password"
            message={errors.password?.message}
            status={errors.password?.message ? "error" : "none"}
          />

          <ControlledFieldText
            type="password"
            label="Konfirmasi Password"
            placeholder="Masukkan Konfirmasi Password"
            control={control}
            name="confirmPassword"
            message={errors.confirmPassword?.message}
            status={errors.confirmPassword?.message ? "error" : "none"}
          />
        </div>
      </div>

      <ControlledFieldCheckbox
        size="sm"
        name="toc"
        control={control}
        text="Setujui Syarat & Ketentuan"
      />

      <Button size="md" type="submit" disabled={!isValid} variant="primary">
        Daftar Sekarang
      </Button>

      <NeoTypography color="text-grey-500" size="body-2">
        Sudah punya akun?{"  "}
        <Link href="/auth/login" className="text-green-500">
          Masuk Sekarang
        </Link>
      </NeoTypography>
    </form>
  );
};

"use client";
import { TVSLogin, VSLogin } from "@uninus/entities";
import { NeoButton, NeoTypography } from "@uninus/ui-atoms";
import { ControlledFieldCheckbox, ControlledFieldText } from "@uninus/ui-organisms";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AuthLogin } from "../_actions";

export const LoginModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { remember?: boolean }>({
    resolver: zodResolver(VSLogin),
    mode: "all",
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await AuthLogin(data);
    console.log(res);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full justify-center gap-y-3 w-full">
      <div className="flex flex-col">
        <NeoTypography color="text-grey-800" variant="bold" size="title-5">
          Masuk
        </NeoTypography>
        <NeoTypography color="text-grey-400" variant="reguler" size="body-1">
          Selamat datang, Silahkan masuk dengan kredensial yang sudah terdaftar
        </NeoTypography>
      </div>

      <div className="flex flex-col gap-y-1">
        <ControlledFieldText
          label="Email"
          placeholder="Masukkan Email"
          control={control}
          name="email"
          message={errors.email?.message}
          status={errors.email?.message ? "error" : "none"}
        />
        <ControlledFieldText
          type="password"
          label="Password"
          placeholder="Masukkan Password"
          control={control}
          name="password"
          message={errors.password?.message}
          status={errors.password?.message ? "error" : "none"}
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <ControlledFieldCheckbox size="sm" name="remember" control={control} text="Ingat Saya" />
        <Link href="/auth/forgot-password" className="text-green-500 text-sm w-full text-end">
          Lupa Password?
        </Link>
      </div>

      <NeoButton disabled={!isValid} variant="primary">
        Masuk Sekarang
      </NeoButton>

      <NeoTypography color="text-grey-500" size="body-2">
        Belum punya akun?{"  "}
        <Link href="/auth/register" className="text-green-500">
          Daftar Sekarang
        </Link>
      </NeoTypography>
    </form>
  );
};

"use client";
import { TVSLogin, VSLogin } from "@uninus/entities";
import { NeoButton, NeoTypography } from "@uninus/ui-atoms";
import { ControlledFieldCheckbox, ControlledFieldText } from "@uninus/ui-organisms";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginModule: FC = (): ReactElement => {
  const {
    control,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { remember?: boolean }>({
    resolver: zodResolver(VSLogin),
    mode: "all",
  });
  return (
    <div className="flex flex-col h-full justify-start gap-y-6">
      <div className="flex flex-col">
        <NeoTypography color="text-grey-800" variant="bold" size="title-5">
          Masuk
        </NeoTypography>
        <NeoTypography color="text-grey-400" variant="medium" size="body-1">
          Selamat datang, Silahkan masuk dengan kredensial yang sudah terdaftar
        </NeoTypography>
      </div>

      <div className="flex flex-col gap-y-2">
        <ControlledFieldText
          label="Email"
          placeholder="Masukkan Email"
          control={control}
          name="email"
          message={errors.email?.message}
          status={errors.email?.message ? "error" : "none"}
        />
        <ControlledFieldText
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
        <NeoTypography color="text-grey-500" size="body-2">
          Lupa Password?
        </NeoTypography>
      </div>

      <NeoButton disabled={!isValid} variant="primary">
        Masuk Sekarang
      </NeoButton>
    </div>
  );
};

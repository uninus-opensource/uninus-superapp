"use client";
import { Button, TextField } from "@uninus/web/components";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useForgot } from "./hook";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TVSForgotPassword, VSForgotPassword } from "@uninus/entities";
import { useUserEmail } from "@uninus/web/services";

export const ForgotModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSForgotPassword>({
    mode: "all",
    resolver: zodResolver(VSForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const { setEmail } = useUserEmail();

  const router = useRouter();

  const { mutate, isError } = useForgot();

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        email: data?.email,
      },
      {
        onSuccess: () => {
          setEmail(data?.email);
          router.push(`/auth/verifikasi-forget`);
        },
      },
    );
  });

  return (
    <form
      key="auth-forgot"
      className="w-full h-full p-12 lg:px-12 lg:py-4 flex flex-col justify-center items-center"
      onSubmit={onSubmit}
    >
      <div className="w-full flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-primary-black font-bebasNeue w-50%">
          LUPA PASSWORD ?
        </h1>
        <p className="text-grayscale-5 text-sm">Masukkan email yang didaftarkan pada akun anda</p>
        <TextField
          name="email"
          type="email"
          variant="md"
          placeholder="Masukan email"
          control={control}
          required
          status={errors?.email || isError ? "error" : undefined}
          message={
            errors?.email?.message ||
            (isError ? "email tidak ditemukan atau tidak valid" : undefined)
          }
        />
        <Button disabled={!isValid}>Lanjutkan</Button>
      </div>
    </form>
  );
};

"use client";
import { Button, TextField } from "@uninus/web/components";
import { FC, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRegister } from "./hook";
import { useRouter } from "next/navigation";
import { VSRegister, TVSRegister } from "@uninus/entities";
import { ToastContainer, toast } from "react-toastify";
import { useUserEmail } from "@uninus/web/services";

export const RegisterModule: FC = (): ReactElement => {
  const [getError, setError] = useState<string | undefined>(undefined);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSRegister>({
    mode: "all",
    resolver: zodResolver(VSRegister),
    defaultValues: {
      email: "",
      password: "",
      phone_number: "",
      fullname: "",
    },
  });

  const { setEmail } = useUserEmail();
  const { mutate, isLoading } = useRegister();

  const onSubmit = handleSubmit(async (data) => {
    try {
      mutate(
        {
          email: data?.email,
          password: data?.password,
          phone_number: data?.phone_number,
          fullname: data?.fullname,
        },
        {
          onSuccess: () => {
            setEmail(data?.email);
            router.push(`/auth/verifikasi-otp`);
          },
          onError: (error) => {
            const errMessage = error?.response?.data?.message;
            setError(errMessage);
            setTimeout(() => {
              toast.error(`${errMessage}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            });
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form
      key="auth-register"
      onSubmit={onSubmit}
      className="w-full h-auto px-5 lg:px-12  flex flex-col py-8  md:gap-y-1"
    >
      <div className="w-full justify-start flex lg:mt-10">
        {getError && (
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        )}
        <div className="flex flex-col justify-end lg:gap-y-1 py-2">
          <h1 className="font-bold text-base lg:text-xl 2xl:text-3xl">Registrasi</h1>
          <div className="border-2 border-primary-green w-2/3 rounded-md"></div>
        </div>
      </div>
      <div className="h-auto w-full">
        <div className="grid gap-x-4 w-full grid-cols-1 md:grid-cols-2 grid-rows-2">
          <div className="">
            <TextField
              name="fullname"
              type="text"
              variant="md"
              label="Nama Lengkap"
              placeholder="Masukan Nama Lengkap"
              control={control}
              required
              status={errors?.fullname ? "error" : undefined}
              message={errors?.fullname?.message}
            />
          </div>
          <div className=" flex flex-col mt-1">
            <label className="text-xs md:text-sm xl:text-md lg:text-xs 2xl:text-lg font-semibold">
              Nomor Handphone <span className="text-primary-green">*</span>
            </label>

            <div className="flex mt-1">
              <div>
                <div className="bg-primary-green grid place-items-center rounded-l-md px-[0.7rem] py-[0.6rem] mt-1 xl:py-[0.85rem]">
                  <p className="text-primary-white text-[12px]">+62</p>
                </div>
              </div>

              <div className="w-full">
                <TextField
                  name="phone_number"
                  type="number"
                  variant="telp"
                  placeholder="Masukan Nomor Handphone"
                  control={control}
                  required
                  status={errors?.phone_number ? "error" : undefined}
                  message={errors?.phone_number?.message}
                  maxlenght={16}
                  inputMode="tel"
                />
              </div>
            </div>
          </div>
          <div className="">
            <TextField
              name="email"
              type="email"
              variant="md"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
          </div>
          <div className="">
            <TextField
              name="password"
              type="password"
              variant="md"
              label="Kata Sandi"
              control={control}
              placeholder="Masukan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
        </div>
      </div>
      <div className="h-[33%] md:h-[36%] lg:h-[31%] flex flex-col gap-3 lg:gap-2 lg:mt-[0.5rem]">
        <div className="flex justify-center">
          <div className="w-full">
            <Button
              loading={isLoading}
              disabled={!isValid}
              width="w-full"
              height="lg:h-8 xl:h-auto"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex gap-2">
            <p className="text-grayscale-4 text-[12px]">Sudah memiliki akun ?</p>
            <Link href="/auth/login" className="text-primary-green text-[12px]">
              Login
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:gap-2">
            <p className="text-grayscale-4 text-[12px]">Sudah daftar tapi lupa verifikasi ?</p>
            <Link
              href="/auth/confirm-password?content=verifikasi"
              className="text-primary-green text-[12px]"
            >
              Verifikasi sekarang
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

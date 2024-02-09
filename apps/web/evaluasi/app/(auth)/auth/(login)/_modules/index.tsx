"use client";
import { Button } from "@uninus/web/components";
import { NeoTypography } from "@uninus/ui-atoms";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VSLogin, TVSLogin } from "@uninus/entities";
import Image from "next/image";
import { AuthLogin } from "../_actions";
import { ControlledFieldText } from "@uninus/ui-organisms";

export const LoginEvaluasiDosenModule: FC = (): ReactElement => {
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
    <section
      key="auth-admin-evaluasi"
      className={`w-full min-h-screen bg-[#E6F5ED] bg-cover bg-center object-cover bg-no-repeat -z-10`}
    >
      <div className="relative w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] float-right bg-cover z-10">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full "
          priority
        />
      </div>

      <div className="w-full h-screen flex justify-center items-center z-20 absolute">
        <form
          onSubmit={onSubmit}
          className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-6 px-8 lg:px-14 flex flex-col items-center justify-center gap-y-6"
        >
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              width={130}
              height={130}
              priority
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
              priority
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex flex-col justify-center font-extrabold text-sm lg:text-xl mb-6">
              <NeoTypography color="text-grey-800" variant="bold" size="title-5">
                PORTAL
              </NeoTypography>
              <NeoTypography color="text-grey-400" variant="semi-bold" size="subtitle-2">
                Administrasi Evaluasi Dosen
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
                name="password"
                type="password"
                label="Kata Sandi"
                control={control}
                placeholder="Masukkan Kata Sandi"
                message={errors.password?.message}
                status={errors.password?.message ? "error" : "none"}
              />
            </div>
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                variant="elevated"
                disabled={!isValid}
                styling="text-xs lg:text-base w-full h-5 xl:h-10"
                type="submit"
              >
                Masuk
              </Button>
            </div>
            <NeoTypography color="text-grey-400" variant="reguler" size="body-2">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </NeoTypography>
          </div>
        </form>
      </div>
      <div className="absolute w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] bottom-0 left-0 rotate-180 bg-cover z-10">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full  absolute h-full"
          priority
        />
      </div>
    </section>
  );
};

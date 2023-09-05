"use client";
import { Button, CheckBox, TextField } from "@uninus/web/components";
import { signIn } from "next-auth/react";
import { FC, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VSLogin, TVSLogin } from "@uninus/entities";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
export const LoginUserModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: email || "",
      password: "",
      aggreement: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn("login", {
        redirect: false,
        email: data?.email,
        password: data?.password,
      });
      if (response?.error) {
        setError(response.error);
        toast.error(`${response.error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  });

  return (
    <form
      key="auth-login"
      onSubmit={onSubmit}
      className="w-full px-5 lg:px-0 flex flex-col gap-y-8 py-8 lg:items-center flex-wrap"
    >
      <div className="flex flex-col p-4 xl:w-4/5 2xl:w-4/5 lg:mt-8 mt-0">
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
        <div className="flex flex-col 2xl:gap-y-2 ">
          <h1 className="font-bold text-xl xl:text-2xl 2xl:text-4xl text-center lg:text-start">
            Login
          </h1>
          <p className="text-grayscale-5 w-full text-xs lg:w-[35vw] 2xl:text-md lg:mb-1 text-center lg:text-left">
            Selamat Datang Calon Nusantara Muda
          </p>
        </div>

        <div className="flex flex-col w-full justify-center items-center mt-6 md:mt-0">
          <div className="justify-center w-full flex flex-col gap-5 md:gap-0">
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
            <TextField
              name="password"
              type="password"
              variant="md"
              label="Password"
              control={control}
              placeholder="Masukan password"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
        </div>
        <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5">
          <div className="flex justify-between md:justify-around lg:justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-grayscale-4 hover:text-grayscale-6 duration-300 text-[12px]"
            >
              Lupa password ?
            </Link>
          </div>
          <div className="flex justify-center">
            <Button
              loading={isLoading}
              disabled={!isValid}
              width="w-full"
              height="lg:h-5 xl:h-auto"
            >
              Masuk Sekarang
            </Button>
          </div>
          <div className="flex gap-2">
            <p className="text-grayscale-4 text-[12px]">Belum memiliki akun ?</p>
            <Link href="/auth/register" className="text-primary-green text-[12px]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export const LoginAdminModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn("login", {
        redirect: false,
        email: data?.email,
        password: data?.password,
      });
      if (response?.error) {
        setError(response.error);
        toast.error(`${response.error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  });

  return (
    <section
      key="auth-admin-pmb"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-admin.webp)] bg-center bg-no-repeat bg-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
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
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
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
            <div className="w-full text-center items-center flex flex-col justify-center font-extrabold text-sm lg:text-xl mb-6">
              <h1>PORTAL ADMIN PMB</h1>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                loading={isLoading}
                disabled={!isValid}
                width="w-full"
                height="lg:h-5 xl:h-auto"
                variant="green-outline"
              >
                Masuk Sekarang
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

export const LoginAdminKeuanganModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });
  return (
    <section
      key="auth-admin-keuangan"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-keuangan.webp)] bg-center bg-no-repeat bg-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        <form className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-6 px-8 lg:px-14 flex flex-col items-center justify-center gap-y-6">
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              width={130}
              height={130}
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex flex-col justify-center font-extrabold text-sm lg:text-xl mb-6">
              <h1>PORTAL</h1>
              <h1>Administrasi Keuangan</h1>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-between md:justify-around lg:justify-between">
              <CheckBox
                name="aggreement"
                control={control}
                label="Ingat saya"
                variant="primary"
                size="md"
              />
              <Link
                href=""
                className="text-grayscale-4 hover:text-grayscale-6 duration-300 text-[12px]"
              >
                Lupa password ?
              </Link>
            </div>
            <div className="flex justify-center">
              <Button
                // loading={isLoading}
                variant="custom"
                disabled={!isValid}
                styling="text-xs lg:text-base w-full h-5 xl:h-10"
              >
                Masuk
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};
export const LoginTracerAlumni: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });
  return (
    <section
      key="auth-tracer-alumni"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-keuangan.webp)] bg-center bg-no-repeat bg-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        <form className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-8 px-10 lg:px-14 flex flex-col items-center justify-center gap-y-6">
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-[45%] "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              width={130}
              height={130}
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex flex-col justify-center font-extrabold text-sm lg:text-xl mb-6">
              <div className="w-1/2">
                <h1 className="text-md font-bold">Selamat Datang Di Tracer Alumni</h1>
              </div>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                // loading={isLoading}
                variant="custom"
                disabled={!isValid}
                styling="text-xs lg:text-base w-full h-5 xl:h-10"
              >
                Masuk
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

export const LoginAdminTataUsahaModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });
  return (
    <section
      key="auth-admin-tata-usaha"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-tata-usaha.webp)] bg-center bg-no-repeat bg-cover-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        <form className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-6 px-8 lg:px-14 flex flex-col items-center justify-center gap-y-6">
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              width={130}
              height={130}
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex  justify-center font-extrabold text-sm lg:text-xl mb-6">
              <h1>PORTAL TATA USAHA</h1>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                // loading={isLoading}
                variant="elevated"
                disabled={!isValid}
                styling="text-xs lg:text-base w-full h-5 xl:h-10"
              >
                Masuk
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

export const LoginSiakadModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });
  return (
    <section
      key="auth-siakad"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-siakad.webp)] bg-center bg-no-repeat bg-cover-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        <form className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-6 px-8 lg:px-14 flex flex-col items-center justify-center gap-y-6">
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              width={130}
              height={130}
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex  justify-center font-extrabold text-sm lg:text-xl mb-6">
              <h1>PORTAL SIAKAD</h1>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                // loading={isLoading}
                variant="elevated"
                disabled={!isValid}
                styling="text-xs lg:text-base w-full h-5 xl:h-10"
              >
                Masuk
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

export const LoginEvaluasiDosenModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });
  return (
    <section
      key="auth-admin-evaluasi"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-evaluasi.webp)] bg-center bg-no-repeat bg-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        <form className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-6 px-8 lg:px-14 flex flex-col items-center justify-center gap-y-6">
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              width={130}
              height={130}
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex flex-col justify-center font-extrabold text-sm lg:text-xl mb-6">
              <h1>PORTAL</h1>
              <h1>Administrasi Evaluasi Dosen</h1>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                // loading={isLoading}
                variant="elevated"
                disabled={!isValid}
                styling="text-xs lg:text-base w-full h-5 xl:h-10"
              >
                Masuk
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

export const LoginManajemenPegawaiModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      aggreement: false,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn("login", {
        redirect: false,
        email: data?.email,
        password: data?.password,
      });
      if (response?.error) {
        setError(response.error);
        toast.error(`${response.error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  });

  return (
    <section
      key="auth-admin-tata-usaha"
      className="w-full min-h-screen bg-[url(/illustrations/bg-auth-pegawai.webp)] bg-center bg-no-repeat bg-cover-primary-green bg-blend-overlay"
    >
      <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm">
        <form
          onSubmit={onSubmit}
          className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-surface rounded-md py-8 px-12 lg:px-14 flex flex-col items-center justify-center gap-y-6"
        >
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
          <figure className="w-full flex items-center justify-between mb-6 lg:mb-2">
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-neo-uninus.webp"}
              alt="image"
              quality={100}
              width={130}
              height={130}
            />
            <Image
              className="relative w-1/3 "
              src={"/illustrations/dark-hybrid-university.webp"}
              alt="image"
              quality={100}
              width={100}
              height={100}
            />
          </figure>
          <div className="w-full">
            <div className="w-full text-center items-center flex justify-center font-bold text-sm lg:text-lg mb-6">
              <h1 className="w-[70%]">PORTAL ADMIN MANAJEMEN PEGAWAI</h1>
            </div>
            <TextField
              name="email"
              type="email"
              variant="sm"
              label="Email"
              placeholder="Masukan email"
              control={control}
              required
              status={errors?.email ? "error" : undefined}
              message={errors?.email?.message}
            />
            <TextField
              name="password"
              type="password"
              variant="sm"
              label="Kata Sandi"
              control={control}
              placeholder="Masukkan Kata Sandi"
              required
              status={errors?.password ? "error" : undefined}
              message={errors?.password?.message}
            />
          </div>
          <div className="flex flex-col xl:gap-y-6 lg:gap-y-2 gap-y-5 w-full">
            <div className="flex justify-center">
              <Button
                loading={isLoading}
                variant="elevated"
                disabled={!isValid}
                styling="text-xs lg:text-base font-semibold  w-full h-5 xl:h-10"
              >
                Masuk
              </Button>
            </div>
            <h2 className="text-[9px] lg:text-xs text-center lg:mt-8">
              &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

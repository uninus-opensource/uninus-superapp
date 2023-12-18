"use client";
import { Button, TextField } from "@uninus/web/components";
import { signIn } from "next-auth/react";
import { FC, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VSLogin, TVSLogin } from "@uninus/entities";
import Image from "next/image";
import { useUserEmail } from "@uninus/web/services";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export const LoginUserModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const { getEmail } = useUserEmail();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin & { aggreement?: boolean }>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: getEmail || "",
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
      className={`w-full min-h-screen bg-[#E6F5ED] bg-cover bg-center object-cover bg-no-repeat -z-10`}
    >
      <div className="relative w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] float-right bg-cover z-20">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full"
        />
      </div>

      <div className="w-full h-screen flex justify-center items-center z-50 absolute">
        <form
          onSubmit={onSubmit}
          className="w-5/6 md:w-1/2 lg:w-1/3 bg-primary-white rounded-md py-6 px-8 lg:px-14 flex flex-col items-center justify-center gap-y-6 z-50"
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
              <h1>PORTAL</h1>
              <h1>PMB Admin</h1>
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
      <div className="absolute w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] bottom-0 left-0 rotate-180 bg-cover z-20">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full"
        />
      </div>
    </section>
  );
};

export const LoginAdminKeuanganModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string | undefined>(undefined);
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
      key="auth-admin-evaluasi"
      className={`w-full min-h-screen bg-[#E6F5ED] bg-cover bg-center object-cover bg-no-repeat -z-10`}
    >
      <div className="relative w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] float-right bg-cover z-10">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full"
        />
      </div>

      <div className="w-full h-screen flex justify-center items-center z-40 absolute">
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
            <div className="flex justify-center">
              <Button
                loading={isLoading}
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
      <div className="absolute w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] bottom-0 left-0 rotate-180 bg-cover z-10">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full"
        />
      </div>
    </section>
  );
};
export const LoginTracerAlumni: FC = (): ReactElement => {
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
      key="auth-tracer-alumni"
      className={`w-full min-h-screen bg-[url(/illustrations/backgroundAuthMd.svg)] lg:bg-[url(/illustrations/backgroundAuthLg.svg)] bg-cover bg-center object-cover bg-no-repeat`}
    >
      <div className="w-full h-screen flex justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="w-5/6 md:w-1/2 lg:w-1/3  bg-primary-white rounded-md py-8 px-12 lg:px-14 flex flex-col items-center justify-center gap-y-6"
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
              <h1 className="md:w-[45%] w-[70%]">Selamat Datang Di Tracer Alumni</h1>
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

export const LoginAdminTataUsahaModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
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
      className={`w-full min-h-screen bg-[url(/illustrations/backgroundAuthMd.svg)] lg:bg-[url(/illustrations/backgroundAuthLg.svg)] bg-cover bg-center object-cover bg-no-repeat`}
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
      <div className="w-full h-screen flex justify-center items-center">
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
            <div className="w-full text-center items-center flex  justify-center font-semibold text-sm lg:text-xl mb-6">
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
                loading={isLoading}
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TVSLogin>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
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

  const data = [
    {
      title: "KRS Semester Ganjil T.A. 2023/2024",
      description: "Segera lakukan kredit semester, dan konfirmasi ke dosen wali terkait KRS",
    },
    {
      title: "Ujian Akhir Semester T.A. 2023/2024 Telah Usai",
      description: "Uas T.A. 2023/2024 telah usai, selamat beristirahat",
    },
    {
      title: "Batas Pengisian Nilai ke Nusaverse",
      description: "Untuk dosen segera lakukan pengisian nilai perkuliahan sampai pukul 17.00 WIB",
    },
  ];

  const cardNews: ReactElement[] = data.map((item, index) => (
    <div key={index} className="w-[60vw] lg:w-[40vw] xl:w-[37vw]">
      <div className="w-[90%] lg:h-[14vh] xl:h-[16vh] bg-primary-white shadow-md lg:shadow-lg flex flex-col gap-2 justify-center items-start p-7 px-5">
        <h1 className="font-bold text-dark-default md:text-[1.2rem]">{item.title}</h1>
        <p className="text-body-light text-xs md:text-[1rem]">{item.description}</p>
      </div>
    </div>
  ));

  return (
    <section
      key="auth-siakad"
      className={`w-full min-h-screen bg-[url(/illustrations/background-auth.webp)] bg-cover bg-center object-cover bg-no-repeat font-montserrat`}
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
      <div className="w-full h-screen flex flex-col items-center">
        <div className=" w-full h-[20%] md:h-[12%] flex items-center xl:items-end">
          <h1 className="text-primary-green font-bold text-[31px] leading-[43.4px] md:text-[39px] md:leading-[54.6px] lg:text-[49px] lg:leading-[58.8px] ml-[5%] uppercase">
            nusa
            <span className="text-primary-yellow font-semibold text-[25px] leading-[37.5px] lg:text-[31px] lg:leading-[43.4px]">
              verse
            </span>
          </h1>
        </div>
        <div className="w-full h-[60%] flex flex-col md:flex-row">
          <div className="w-1/2 h-full justify-end items-center hidden md:flex ">
            <Image
              src={"/illustrations/IllustrationAuth.svg"}
              width={336}
              height={234}
              alt="Illustrations login"
              className="lg:w-[430px] lg:h-[350px] xl:w-[480px]"
            />
          </div>
          <div className="w-full h-full md:w-1/2  flex justify-center items-center">
            <form
              onSubmit={onSubmit}
              className="w-5/6 h-5/6 md:w-5/6 xl:w-[63%] xl:h-[95%] bg-primary-white xl:bg-primary-white rounded-md flex flex-col items-center justify-center gap-y-7 lg:gap-y-5 xl:gap-y-5"
            >
              <figure className="w-full flex items-center justify-between px-8 xl:px-9">
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
                <div className="w-full text-center items-center flex justify-center font-extrabold text-[13px] leading-[19.5px] lg:text-[18px] xl:text-[16.8px] mb-6 lg:mb-5 xl:mb-5 uppercase">
                  <h1>selamat datang di nusaverse</h1>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="w-[80%]">
                    <TextField
                      name="email"
                      type="email"
                      placeholder="Masukan email"
                      control={control}
                      variant="sm"
                      required
                      status={errors?.email ? "error" : undefined}
                      message={errors?.email?.message}
                      className="w-full"
                    />
                  </div>

                  <div className="w-[80%]">
                    <TextField
                      name="password"
                      type="password"
                      control={control}
                      placeholder="Masukkan Kata Sandi"
                      variant="sm"
                      required
                      status={errors?.password ? "error" : undefined}
                      message={errors?.password?.message}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-center justify-center gap-y-7 lg:gap-y-5 xl:gap-y-5">
                <div className="w-[80%]">
                  <Button
                    loading={isLoading}
                    variant="elevated"
                    disabled={!isValid}
                    styling="text-xs lg:text-base h-[36px] w-full h-5 xl:h-7"
                  >
                    Masuk
                  </Button>
                </div>
                <h2 className="text-[9px] lg:text-xs text-center">
                  &copy; NEO UNIVERSITAS ISLAM NUSANTARA 2023
                </h2>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full md:w-full min-h-[25%] h-auto md:h-[25%] flex flex-col items-center gap-3">
          <div className="w-5/6 flex justify-start lg:w-[90%]">
            <h1 className="text-lg capitalize font-bold mt-[5%] lg:mt-0 lg:text-[1.5rem]">
              kalender akademik
            </h1>
          </div>
          <div className="w-5/6 flex flex-col md:hidden gap-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full md:w-[40vw]  bg-primary-white shadow-md flex flex-col gap-2 justify-center items-start p-4 md:px-2"
              >
                <h1 className="font-bold text-dark-default md:text-[1.2rem]">{item.title}</h1>
                <p className="text-body-light text-xs md:text-[1rem]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="hidden md:flex md:justify-center md:items-center md:w-full">
            <AliceCarousel
              mouseTracking
              autoWidth
              paddingLeft={50}
              disableButtonsControls={true}
              disableDotsControls={true}
              items={cardNews}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const LoginEvaluasiDosenModule: FC = (): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string | undefined>(undefined);
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
      key="auth-admin-evaluasi"
      className={`w-full min-h-screen bg-[#E6F5ED] bg-cover bg-center object-cover bg-no-repeat -z-10`}
    >
      <div className="relative w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] float-right bg-cover z-50">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full"
        />
      </div>

      <div className="w-full h-screen flex justify-center items-center z-10 absolute">
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
                loading={isLoading}
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
      <div className="absolute w-72 h-72 md:w-[36rem] md:h-[36rem] 2xl:w-[45rem] 2xl:h-[45rem] bottom-0 left-0 rotate-180 bg-cover z-50">
        <Image
          width={100}
          height={100}
          src={"/illustrations/shapeBG.svg"}
          alt="decoration"
          className="object-right-top object-scale-down bg-contain w-full absolute h-full"
        />
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
      className={`w-full min-h-screen bg-[url(/illustrations/backgroundAuthMd.svg)] lg:bg-[url(/illustrations/backgroundAuthLg.svg)] bg-cover bg-center object-cover bg-no-repeat`}
    >
      <div className="w-full h-screen flex justify-center items-center">
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

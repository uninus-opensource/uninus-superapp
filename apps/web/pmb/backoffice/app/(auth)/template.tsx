import type { FC, PropsWithChildren, ReactElement } from "react";
import Image from "next/image";

const LoginTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <main className="w-full min-h-screen h-full flex items-center justify-center bg-green-500 p-6 md:p-0">
      <section className="max-w-[840px] h-[490px] w-full rounded-xl flex bg-grey-100">
        <div className="w-1/2 hidden md:block relative h-full rounded-tl-xl rounded-bl-xl">
          <div className="bg-black absolute opacity-50 rounded-tl-xl rounded-bl-xl h-[490px] w-full" />
          <Image
            src="/login-backdrop.jpeg"
            alt="logo"
            className="w-full h-full background-cover object-cover rounded-tl-xl rounded-bl-xl"
            width={420}
            height={490}
          />
        </div>
        <div className="flex p-8 w-auto bg-white rounded-xl md:rounded-tr-xl md:rounded-br-xl">
          {children}
        </div>
      </section>
    </main>
  );
};

export default LoginTemplate;

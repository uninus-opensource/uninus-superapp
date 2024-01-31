import type { FC, PropsWithChildren, ReactElement } from "react";

const LoginTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <main className="w-full min-h-screen h-full flex items-center justify-center bg-green-500">
      <section className="max-w-[840px] h-auto w-full rounded-lg flex bg-grey-100">
        <div className="w-1/2 bg-black h-[490px] rounded-tl-lg rounded-bl-lg backdrop-blur-md backdrop-opacity-20"></div>
        <div className="flex p-8 w-1/2">{children}</div>
      </section>
    </main>
  );
};

export default LoginTemplate;

import { CaretRightFilled } from "@ant-design/icons";
import Link from "next/link";
import { FC, PropsWithChildren, ReactElement } from "react";

export const RedirectLink: FC<PropsWithChildren<{ link: string }>> = ({
  link,
  children,
}): ReactElement => {
  return (
    <section data-testid="redirect-link" className="w-full flex justify-end pr-[3rem]">
      <Link
        href={link}
        className="bg-primary-green text-primary-white rounded-[5px] px-4 flex justify-center items-center gap-2"
      >
        {children}
        <CaretRightFilled />
      </Link>
    </section>
  );
};

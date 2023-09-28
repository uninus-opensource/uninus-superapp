import { FC, ReactElement } from "react";
import { TCardProps } from "./type";

export const CardImage: FC<TCardProps> = ({ children, height = "h-full" }): ReactElement => {
  return (
    <section
      data-testid="card"
      className={`flex flex-col w-full    ${height} gap-y-4 rounded-xl shadow-md bg-primary-white shadow-grayscale-2 relative `}
    >
      <div className="">{children}</div>
    </section>
  );
};

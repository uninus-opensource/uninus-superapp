import { FC, ReactElement } from "react";
import { TCardProps } from "./type";

export const Card: FC<TCardProps> = ({
  cardTitle,
  icon,
  iconText,
  children,
  height = "h-auto",
}): ReactElement => {
  return (
    <section
      data-testid="card"
      className={`flex flex-col w-auto md:w-72 lg:p-8 p-4 lg:h-72 ${height} gap-y-4 rounded-xl shadow-md bg-primary-white shadow-grayscale-2 relative mx-2`}
    >
      <figure
        data-testid="card-figure"
        className={`w-14 h-14 p-2 flex justify-center items-center font-bold bg-secondary-green-4 text-primary-white rounded-md 
      ${iconText ? "text-3xl " : "text-5xl"}`}
      >
        {iconText ? iconText : icon}
      </figure>
      <h1 className="lg:text-2xl text-sm font-extrabold text-secondary-green-4 uppercase">
        {cardTitle}
      </h1>
      <div className="text-xs font-extramedium">{children}</div>
    </section>
  );
};

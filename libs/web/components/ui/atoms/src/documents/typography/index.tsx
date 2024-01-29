import { FC, ReactElement } from "react";
import { TTypography } from "./type";
import { match } from "ts-pattern";
import clsx from "clsx";

export const NeoTypography: FC<TTypography> = (props): ReactElement => {
  const size = match(props.size)
    .with("title-1", () => "text-[76px]")
    .with("title-2", () => "text-[61px]")
    .with("title-3", () => "text-[49px]")
    .with("title-4", () => "text-[39px]")
    .with("title-5", () => "text-[31px]")
    .with("subtitle-1", () => "text-[25px]")
    .with("subtitle-2", () => "text-[20px]")
    .with("body-1", () => "text-[16px]")
    .with("body-2", () => "text-[13px]")
    .with("caption", () => "text-[10px]")
    .otherwise(() => "text-[16px]");

  const responsiveSm = match(props.sizeResponsiveSM)
    .with("title-1", () => "sm:text-[76px]")
    .with("title-2", () => "sm:text-[61px]")
    .with("title-3", () => "sm:text-[49px]")
    .with("title-4", () => "sm:text-[39px]")
    .with("title-5", () => "sm:text-[31px]")
    .with("subtitle-1", () => "sm:text-[25px]")
    .with("subtitle-2", () => "sm:text-[20px]")
    .with("body-1", () => "sm:text-[16px]")
    .with("body-2", () => "sm:text-[13px]")
    .with("caption", () => "sm:text-[10px]")
    .otherwise(() => "");

  const responsiveMd = match(props.sizeResponsiveMD)
    .with("title-1", () => "md:text-[76px]")
    .with("title-2", () => "md:text-[61px]")
    .with("title-3", () => "md:text-[49px]")
    .with("title-4", () => "md:text-[39px]")
    .with("title-5", () => "md:text-[31px]")
    .with("subtitle-1", () => "md:text-[25px]")
    .with("subtitle-2", () => "md:text-[20px]")
    .with("body-1", () => "md:text-[16px]")
    .with("body-2", () => "md:text-[13px]")
    .with("caption", () => "md:text-[10px]")
    .otherwise(() => "");

  const responsiveLg = match(props.sizeResponsiveLG)
    .with("title-1", () => "lg:text-[76px]")
    .with("title-2", () => "lg:text-[61px]")
    .with("title-3", () => "lg:text-[49px]")
    .with("title-4", () => "lg:text-[39px]")
    .with("title-5", () => "lg:text-[31px]")
    .with("subtitle-1", () => "lg:text-[25px]")
    .with("subtitle-2", () => "lg:text-[20px]")
    .with("body-1", () => "lg:text-[16px]")
    .with("body-2", () => "lg:text-[13px]")
    .with("caption", () => "lg:text-[10px]")
    .otherwise(() => "");

  const textPosisition = match(props.textPosisition)
    .with("left", () => "text-left")
    .with("center", () => "text-center")
    .with("right", () => "text-right")
    .with("justify", () => "text-justify")
    .otherwise(() => "text-left");

  const textType = match(props.textType)
    .with("uppercase", () => "uppercase")
    .with("capitalize", () => "capitalize")
    .with("lowercase", () => "lowercase")
    .otherwise(() => "normal-case");

  const type = clsx(
    size,
    textType,
    textPosisition,
    responsiveSm,
    responsiveMd,
    responsiveLg,
    props.responsiveClassName,
    props.color,
    {
      "font-bold": props.variant === "bold",
      "font-semibold": props.variant === "semi-bold",
      "font-medium": props.variant === "medium",
      "font-regular": props.variant === "reguler",
    },
  );

  return match(props.size)
    .with("title-1", () => <h1 className={type}>{props.children}</h1>)
    .with("title-2", () => <h2 className={type}>{props.children}</h2>)
    .with("title-3", () => <h3 className={type}>{props.children}</h3>)
    .with("title-4", () => <h4 className={type}>{props.children}</h4>)
    .with("title-5", () => <h5 className={type}>{props.children}</h5>)
    .with("subtitle-1", () => <span className={type}>{props.children}</span>)
    .with("subtitle-2", () => <span className={type}>{props.children}</span>)
    .with("body-2", () => <p className={type}>{props.children}</p>)
    .with("body-1", () => <p className={type}>{props.children}</p>)
    .with("caption", () => <p className={type}>{props.children}</p>)
    .with(undefined, () => <p className={type}>{props.children}</p>)
    .exhaustive();
};

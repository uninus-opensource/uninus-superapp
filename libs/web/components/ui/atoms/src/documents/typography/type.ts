import { DetailedHTMLProps, HTMLAttributes } from "react";

export type TTypography = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  variant?: "bold" | "semi-bold" | "medium" | "reguler";
  size?:
    | "title-1"
    | "title-2"
    | "title-3"
    | "title-4"
    | "title-5"
    | "subtitle-1"
    | "subtitle-2"
    | "body-1"
    | "body-2"
    | "caption";
};

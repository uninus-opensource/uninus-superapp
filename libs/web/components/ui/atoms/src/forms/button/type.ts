import { TSize, TState, TVariant, TVariantType } from "@uninus/entities";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: TVariant;
  size?: TSize;
  variantType?: TVariantType;
  href?: string;
  state?: TState;
};

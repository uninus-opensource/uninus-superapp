import { ReactNode } from "react";

export type AccordionType = {
  title: string;
  titleClassName?: string;
  className?: string;
  children: ReactNode;
  showIcon?: boolean;
  newIcon?: ReactNode;
};

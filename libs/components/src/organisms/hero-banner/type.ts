import { ReactNode } from 'react';

export type TbannerProps = {
  heroTitle?: string;
  heroTitle2?: string;
  heroImages?: string;
  backgrounColor?: string;
  subTitle?: string | ReactNode;
  subTitle2?: string;
  isDownload?: boolean;
  blur?: boolean;
};

import { ReactNode } from 'react';

export type TbannerProps = {
  heroTitle?: string;
  heroTitle2?: string;
  heroTitleBottomRight?: string;
  heroImages?: string;
  backgrounColor?: string;
  subTitle?: string | ReactNode;
  subTitle2?: string;
  isDownload?: boolean;
  blur?: boolean;
  isSlider?: boolean;
};

export type TSliderProps = {
  sliderSection?: ReactNode;
};

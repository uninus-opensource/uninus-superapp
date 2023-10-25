import { FC, ReactElement } from "react";

export const NusaVerseIcon: FC<{
  className?: string;
}> = ({ className = "w-[117px] h-[51px]" }): ReactElement => {
  return (
    <svg viewBox="0 0 117 51" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M54.5699 15.8482L24.094 31.3436C17.1182 34.8905 18.702 45.2874 26.3903 46.4176L60.1476 50.1411C61.8051 50.3848 63.5029 50.097 65 49.3187L96.1107 34.3844C103.102 30.7502 101.342 20.2878 93.5768 19.3204L59.1847 15.0358C57.6054 14.839 55.9982 15.122 54.5699 15.8482Z"
        fill="url(#paint0_linear_216_924)"
      />
      <path
        d="M2.40611 25.2164L53.6429 0.401799C54.2898 0.0884856 55.0065 -0.0455621 55.7182 0.0136616L113.263 4.80265C117.288 5.13767 118.258 10.5878 114.613 12.3903L114 12.6934V39.6702C114 39.7848 113.935 39.8894 113.832 39.9397L112.432 40.6242C112.232 40.7216 112 40.5765 112 40.3547V13.6824L62.3045 38.2568C61.6256 38.5925 60.8685 38.7295 60.1204 38.6522L3.64767 32.8113C-0.345358 32.3983 -1.23141 26.9781 2.40611 25.2164Z"
        fill="url(#paint1_linear_216_924)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_216_924"
          x1="21.4618"
          y1="22.7338"
          x2="107.456"
          y2="37.2832"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.356739" stopColor="#F8BF02" />
          <stop offset="1" stopColor="#FAD455" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_216_924"
          x1="5.02916"
          y1="3.70703"
          x2="120.148"
          y2="41.1482"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#009647" />
          <stop offset="1" stopColor="#00C95F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

import { FC, ReactElement } from "react";

export const ArrowLine: FC = (): ReactElement => {
  return (
    <svg width="16" height="35" viewBox="0 0 16 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1.5C9 0.947715 8.55228 0.5 8 0.5C7.44772 0.5 7 0.947715 7 1.5L9 1.5ZM7.29289 34.2071C7.68342 34.5976 8.31658 34.5976 8.7071 34.2071L15.0711 27.8431C15.4616 27.4526 15.4616 26.8195 15.0711 26.4289C14.6805 26.0384 14.0474 26.0384 13.6569 26.4289L8 32.0858L2.34314 26.4289C1.95262 26.0384 1.31946 26.0384 0.928931 26.4289C0.538406 26.8195 0.538406 27.4526 0.928931 27.8431L7.29289 34.2071ZM7 1.5L7 33.5L9 33.5L9 1.5L7 1.5Z"
        fill="url(#paint0_linear_3576_11138)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3576_11138"
          x1="4.00001"
          y1="34.6636"
          x2="7.95893"
          y2="-7.64205"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.193789" stop-color="#009647" />
          <stop offset="0.60617" stop-color="#009647" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

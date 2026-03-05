import React from "react";

export const BookIcon = ({color = "#292D32" , className}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.6 16.4356V4.5851C21.6 3.40692 20.6378 2.5331 19.4695 2.63129H19.4105C17.3487 2.80801 14.2167 3.85856 12.4691 4.95819L12.3022 5.06619C12.0175 5.24292 11.5462 5.24292 11.2615 5.06619L11.016 4.91892C9.26837 3.8291 6.14618 2.78838 4.08437 2.62147C2.916 2.52329 1.96364 3.40692 1.96364 4.57528V16.4356C1.96364 17.3782 2.72946 18.2618 3.672 18.3796L3.95673 18.4189C6.08728 18.7036 9.37637 19.7836 11.2615 20.8146L11.3007 20.8342C11.5658 20.9815 11.988 20.9815 12.2433 20.8342C14.1284 19.7935 17.4273 18.7036 19.5676 18.4189L19.8916 18.3796C20.8342 18.2618 21.6 17.3782 21.6 16.4356Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7818 5.39014V20.1174"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.60909 8.33569H5.4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.34546 11.2811H5.4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

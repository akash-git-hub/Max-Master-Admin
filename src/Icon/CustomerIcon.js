import React from "react";

const CustomerIcon = ({
  size = 24,
  color = "#292D32",
  strokeWidth = 1.5,
  className = "",
  style = {}
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16.9702 14.4402C18.3402 14.6702 19.8502 14.4302 20.9102 13.7202C22.3202 12.7802 22.3202 11.2402 20.9102 10.3002C19.8402 9.59016 18.3102 9.35016 16.9402 9.59016"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M6.99994 14.4402C5.62994 14.6702 4.11994 14.4302 3.05994 13.7202C1.64994 12.7802 1.64994 11.2402 3.05994 10.3002C4.12994 9.59016 5.65994 9.35016 7.02994 9.59016"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M12 14.6297C11.94 14.6197 11.87 14.6197 11.81 14.6297C10.43 14.5797 9.32996 13.4497 9.32996 12.0497C9.32996 10.6197 10.48 9.46973 11.91 9.46973C13.34 9.46973 14.49 10.6297 14.49 12.0497C14.48 13.4497 13.38 14.5897 12 14.6297Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.08997 17.7794C7.67997 18.7194 7.67997 20.2594 9.08997 21.1994C10.69 22.2694 13.31 22.2694 14.91 21.1994C16.32 20.2594 16.32 18.7194 14.91 17.7794C13.32 16.7194 10.69 16.7194 9.08997 17.7794Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CustomerIcon;

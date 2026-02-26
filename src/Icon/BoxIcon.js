import React from "react";

const BoxIcon = ({ size = 24, color = "#292D32", strokeWidth = 1.5, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.17004 7.44043L12 12.5504L20.77 7.47043"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21.61V12.54"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.93001 2.48028L4.59001 5.44028C3.38001 6.11028 2.39001 7.79028 2.39001 9.17028V14.8203C2.39001 16.2003 3.38001 17.8803 4.59001 18.5503L9.93001 21.5203C11.07 22.1503 12.94 22.1503 14.08 21.5203L19.42 18.5503C20.63 17.8803 21.62 16.2003 21.62 14.8203V9.17028C21.62 7.79028 20.63 6.11028 19.42 5.44028L14.08 2.47028C12.93 1.84028 11.07 1.84028 9.93001 2.48028Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoxIcon;

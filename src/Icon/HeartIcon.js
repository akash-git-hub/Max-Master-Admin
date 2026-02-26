import React from "react";

export const HeartIcon = ({onClick, fill='none' ,stroke="#51526C",size=24}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={fill}
      onClick={onClick}
      className="cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49658 14.3348C8.25018 14.4218 7.84433 14.4218 7.59793 14.3348C5.49624 13.6173 0.800049 10.6242 0.800049 5.55119C0.800049 3.3118 2.6046 1.5 4.82949 1.5C6.14849 1.5 7.31529 2.13775 8.04725 3.12337C8.77922 2.13775 9.95327 1.5 11.265 1.5C13.4899 1.5 15.2945 3.3118 15.2945 5.55119C15.2945 10.6242 10.5983 13.6173 8.49658 14.3348Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

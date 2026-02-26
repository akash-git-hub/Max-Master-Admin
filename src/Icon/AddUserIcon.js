import React from "react";

const AddUserIcon = ({
  size = 24,
  color = "#161103",
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
        d="M18.5 19.5H14.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 21.5V17.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.4501 10.79 7.5601 8.84 7.5601 6.44C7.5501 3.99 9.5401 2 11.9901 2C14.4401 2 16.4301 3.99 16.4301 6.44C16.4301 8.84 14.5301 10.79 12.1601 10.87Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.99 21.8097C10.17 21.8097 8.36004 21.3497 6.98004 20.4297C4.56004 18.8097 4.56004 16.1697 6.98004 14.5597C9.73004 12.7197 14.24 12.7197 16.99 14.5597"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddUserIcon;

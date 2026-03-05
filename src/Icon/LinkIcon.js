import React from 'react'

export const LinkIcon = ({color = "#292D32",size='20'}) => {
  return (
    <svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10 14a5 5 0 0 1 0-7l2-2a5 5 0 1 1 7 7l-1.5 1.5"
    stroke={color}
    strokeWidth="2"
     strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M14 10a5 5 0 0 1 0 7l-2 2a5 5 0 1 1-7-7L6.5 10.5"
    stroke={color}
    strokeWidth="2"
     strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
}

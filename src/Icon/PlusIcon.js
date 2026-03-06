import React from 'react'

export const PlusIcon = ({className, size=24, strokeWidth="2"}) => {
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
    d="M12 5V19M5 12H19"
    stroke="currentColor"
    strokeWidth={strokeWidth}
     strokeLinecap="round"
  />
</svg>

  )
}

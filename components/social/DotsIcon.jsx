import React from "react";

export const DotsIcon = ({ filled, size, height, width, label, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <line
          x1="5.99"
          y1="12"
          x2="6"
          y2="12"
          strokeLinecap="round"
          strokeWidth="2"
        ></line>
        <line
          x1="11.99"
          y1="12"
          x2="12"
          y2="12"
          strokeLinecap="round"
          strokeWidth="2"
        ></line>
        <line
          x1="17.99"
          y1="12"
          x2="18"
          y2="12"
          strokeLinecap="round"
          strokeWidth="2"
        ></line>
      </g>
    </svg>
  );
};

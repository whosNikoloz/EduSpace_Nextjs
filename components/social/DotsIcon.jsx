import React from "react";

export const DotsIcon = ({ filled, size, height, width, label, ...props }) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="miter"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <line
          x1="5.99"
          y1="12"
          x2="6"
          y2="12"
          stroke-linecap="round"
          stroke-width="2"
        ></line>
        <line
          x1="11.99"
          y1="12"
          x2="12"
          y2="12"
          stroke-linecap="round"
          stroke-width="2"
        ></line>
        <line
          x1="17.99"
          y1="12"
          x2="18"
          y2="12"
          stroke-linecap="round"
          stroke-width="2"
        ></line>
      </g>
    </svg>
  );
};

<svg
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  stroke="white"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="miter"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    <line
      x1="5.99"
      y1="12"
      x2="6"
      y2="12"
      stroke-linecap="round"
      stroke-width="2"
    ></line>
    <line
      x1="11.99"
      y1="12"
      x2="12"
      y2="12"
      stroke-linecap="round"
      stroke-width="2"
    ></line>
    <line
      x1="17.99"
      y1="12"
      x2="18"
      y2="12"
      stroke-linecap="round"
      stroke-width="2"
    ></line>
  </g>
</svg>;

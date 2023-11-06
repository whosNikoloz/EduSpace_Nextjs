import React from "react";

export const BeginnerIcon = ({
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512.001 512.001"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="1.0240019999999999"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <polygon
          fill=""
          points="501.801,10.2 133.1,378.901 133.1,501.801 501.801,501.801"
        ></polygon>
        <polygon
          fill="#1E88E5"
          points="10.199,501.801 133.1,501.801 133.1,378.901"
        ></polygon>
        <path d="M2.988,494.59c-2.917,2.917-3.789,7.304-2.21,11.115c1.579,3.811,5.297,6.296,9.422,6.296h491.602 c5.633,0,10.199-4.566,10.199-10.199V10.2c0-4.125-2.486-7.844-6.296-9.423c-3.811-1.579-8.198-0.706-11.115,2.21L2.988,494.59z M122.901,403.525v88.077H34.822L122.901,403.525z M491.602,491.602H143.299V383.126L491.602,34.824V491.602z"></path>
        <path d="M470.183,480.383c5.633,0,10.199-4.566,10.199-10.199V282.518c0-5.633-4.566-10.199-10.199-10.199 s-10.199,4.566-10.199,10.199v187.665C459.984,475.817,464.55,480.383,470.183,480.383z"></path>
        <path d="M470.183,256.001c5.633,0,10.199-4.566,10.199-10.199v-4.08c0-5.633-4.566-10.199-10.199-10.199 s-10.199,4.566-10.199,10.199v4.08C459.984,251.434,464.55,256.001,470.183,256.001z"></path>
      </g>
    </svg>
  );
};

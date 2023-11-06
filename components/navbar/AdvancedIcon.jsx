import React from "react";

export const AdvancedIcon = ({
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
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.001 512.001"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <polygon
          fill=""
          points="501.801,10.2 378.901,133.1 378.901,501.801 501.801,501.801"
        ></polygon>
        <polygon
          fill="#1E88E5"
          points="10.199,501.801 378.901,501.801 378.901,133.1"
        ></polygon>
        <path d="M2.988,494.59c-2.916,2.917-3.789,7.304-2.211,11.115c1.579,3.811,5.297,6.296,9.423,6.296h491.602 c5.632,0,10.199-4.566,10.199-10.199V10.2c0-4.125-2.486-7.844-6.296-9.423c-3.811-1.579-8.199-0.706-11.115,2.21L2.988,494.59z M368.701,157.724v333.878H34.823L368.701,157.724z M491.602,491.602H389.1V137.326L491.602,34.824V491.602z"></path>
        <path d="M470.184,480.383c5.632,0,10.199-4.566,10.199-10.199V282.518c0-5.633-4.567-10.199-10.199-10.199 c-5.632,0-10.199,4.566-10.199-10.199v187.665C459.984,475.817,464.551,480.383,470.184,480.383z"></path>
        <path d="M470.184,256.001c5.632,0,10.199-4.566,10.199-10.199v-4.08c0-5.633-4.567-10.199-10.199-10.199 c-5.632,0-10.199,4.566-10.199,10.199v4.08C459.984,251.434,464.551,256.001,470.184,256.001z"></path>
      </g>
    </svg>
  );
};

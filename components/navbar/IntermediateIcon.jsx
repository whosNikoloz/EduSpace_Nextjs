import React from "react";

export const IntermediateIcon = ({
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
      ></g>
      <g id="SVGRepo_iconCarrier">
        <polygon
          fill="#1E88E5"
          points="501.801,10.199 501.801,501.801 10.2,501.801"
        ></polygon>
        <path d="M501.801,512H10.2c-4.125,0-7.844-2.486-9.423-6.296c-1.579-3.81-0.706-8.198,2.21-11.115L494.589,2.988 c2.916-2.916,7.305-3.79,11.115-2.21c3.812,1.579,6.297,5.297,6.297,9.422v491.602C512.001,507.434,507.434,512,501.801,512z M34.823,491.602h456.779V34.823L34.823,491.602z"></path>
        <path d="M470.184,480.383c-5.633,0-10.199-4.566-10.199-10.199V282.518c0-5.633,4.566-10.199,10.199-10.199 s10.199,4.566,10.199,10.199v187.665C480.383,475.817,475.817,480.383,470.184,480.383z"></path>
        <path d="M470.184,256c-5.633,0-10.199-4.566-10.199-10.199v-4.08c0-5.633,4.566-10.199,10.199-10.199s10.199,4.566,10.199,10.199 v4.08C480.383,251.434,475.817,256,470.184,256z"></path>
      </g>
    </svg>
  );
};

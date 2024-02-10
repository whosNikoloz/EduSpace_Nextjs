import React from "react";

export const CompilerIcon = ({ size, height, width, ...props }) => {
  return (
    <svg
      version="1.1"
      id="Icons"
      width={width || 24}
      height={height || 24}
      size={size || 24}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      fill="currentColor"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <style type="text/css">
          {`.st0{fill:none;stroke:currentColor;strokeWidth:2;strokeLinecap:round;strokeLinejoin:round;stroke-miterlimit:10;}
            .st1{fill:none;stroke:currentColor;strokeWidth:2;strokeLinejoin:round;stroke-miterlimit:10;}`}
        </style>
        <path
          className="st0"
          d="M28.6,13c-1.6,0.2-3.1-0.5-4-2c-0.8-1.4-0.7-3.2,0.3-4.4c-1.5-1.4-3.3-2.4-5.2-3C19.1,5,17.7,6,16,6 s-3.1-1-3.7-2.5c-2,0.6-3.8,1.6-5.2,3C8,7.8,8.2,9.6,7.3,11c-0.8,1.4-2.4,2.2-4,2c-0.2,1-0.4,2-0.4,3c0,1,0.1,2.1,0.4,3 c1.6-0.2,3.1,0.5,4,2c0.8,1.4,0.7,3.2-0.3,4.4c1.5,1.4,3.3,2.4,5.2,3c0.6-1.4,2-2.5,3.7-2.5s3.1,1,3.7,2.5c2-0.6,3.8-1.6,5.2-3 c-0.9-1.2-1.1-3-0.3-4.4c0.8-1.4,2.4-2.2,4-2c0.2-1,0.4-2,0.4-3C29,15,28.9,13.9,28.6,13z"
        ></path>
        <polyline className="st0" points="11,13 8,16 11,19 "></polyline>
        <polyline className="st0" points="21,13 24,16 21,19 "></polyline>
        <line className="st0" x1="18" y1="12" x2="14" y2="20"></line>
      </g>
    </svg>
  );
};

import React from "react";

export const PlayIcon = ({ size, height, width }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      size={size}
      height={height || 24}
      width={width || 24}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
          fill="currentColor"
        ></path>{" "}
      </g>
    </svg>
  );
};

import React from "react";

export const NotificationIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18,13V9c0-.06,0-.12,0-.18A3,3,0,0,1,17,9a3,3,0,0,1-3-3,2.94,2.94,0,0,1,1-2.2A5.9,5.9,0,0,0,12,3,6,6,0,0,0,6,9v4L4.62,14.38A2.12,2.12,0,0,0,6.12,18H17.88a2.12,2.12,0,0,0,1.5-3.62Z"
        style={{ fill: "#1E88E5", strokeWidth: 2 }}
      ></path>
      <path
        d="M18,9v4l1.38,1.38A2.12,2.12,0,0,1,17.88,18H6.12a2.12,2.12,0,0,1-1.5-3.62L6,13V9a6,6,0,0,1,6-6,6,6,0,0,1,2.88.73"
        style={{
          fill: "none",
          stroke: fill,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></path>
      <path
        data-name="primary"
        d="M12,21h0a3,3,0,0,1-3-3h6A3,3,0,0,1,12,21ZM14,6a3,3,0,0,0,3,3h0a3,3,0,0,0,3-3h0a3,3,0,0,0-3-3h0a3,3,0,0,0-3,3Z"
        style={{
          fill: "none",
          stroke: fill,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></path>
    </svg>
  );
};

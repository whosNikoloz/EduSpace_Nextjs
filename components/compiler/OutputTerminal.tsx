"use client";

import React, { useEffect, useState } from "react";

interface OutputTerminalProps {
  outputDetails: string;
  DarkMode: boolean;
  Height: string;
  Error: boolean;
}

const OutputTerminal: React.FC<OutputTerminalProps> = ({
  outputDetails,
  DarkMode,
  Height,
  Error,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("#24292E");
  const [textColor, setTextColor] = useState("inherit"); // Default text color
  const [dollarColor, setDollarColor] = useState("white"); // Color for the "$" symbol

  // Update the background color when DarkMode changes
  useEffect(() => {
    if (!DarkMode) {
      setBackgroundColor("#fff");
    } else {
      setBackgroundColor("#24292E");
    }
  }, [!DarkMode]);

  // Set text color to red if Error is true, otherwise keep it white
  useEffect(() => {
    if (Error) {
      setTextColor("red");
    } else {
      setTextColor("white"); // Set text color to white for non-error text
    }
  }, [Error]);

  return (
    <div className="w-full">
      <div
        style={{
          height: Height,
          backgroundColor: backgroundColor,
        }}
        className="inverse-toggle px-5 shadow-lg text-sm font-mono subpixel-antialiased pb-6 leading-normal overflow-hidden"
      >
        <div className="flex">
          <p className="flex-1 typing items-center pl-2">
            <span style={{ color: dollarColor }}>$</span>{" "}
            <span style={{ color: textColor }}>{outputDetails}</span>
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutputTerminal;

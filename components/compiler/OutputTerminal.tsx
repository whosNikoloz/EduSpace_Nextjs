"use client";

import React, { useEffect, useState } from "react";

interface OutputTerminalProps {
  outputDetails: string;
  DarkMode: boolean;
  Height: string;
}

const OutputTerminal: React.FC<OutputTerminalProps> = ({
  outputDetails,
  DarkMode,
  Height,
}) => {
  const [backgroundColor, setBackgroundColor] = useState("#24292E");

  // Update the background color when DarkMode changes
  useEffect(() => {
    if (!DarkMode) {
      setBackgroundColor("#fff");
    } else {
      setBackgroundColor("#24292E");
    }
  }, [!DarkMode]);

  return (
    <div className="w-full">
      <div
        style={{ height: Height, backgroundColor: backgroundColor }}
        className="inverse-toggle px-5  shadow-lg  text-sm font-mono subpixel-antialiased  pb-6  leading-normal overflow-hidden"
      >
        <div className="flex">
          <p className="flex-1 typing items-center pl-2">
            $ {outputDetails}
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutputTerminal;

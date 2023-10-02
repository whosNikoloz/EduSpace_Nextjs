"use client";

import React, { useEffect, useState } from "react";

interface OutputTerminalProps {
  outputDetails: string;
  DarkMode: boolean;
}
const containerStyle = {
  height: "85vh", // Set the desired height here
};

const OutputTerminal: React.FC<OutputTerminalProps> = ({
  outputDetails,
  DarkMode,
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
        style={{ height: "85vh", backgroundColor: backgroundColor }}
        className="inverse-toggle px-5 pt-4 shadow-lg text-green-600 text-sm font-mono subpixel-antialiased  pb-6 pt-4  leading-normal overflow-hidden"
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

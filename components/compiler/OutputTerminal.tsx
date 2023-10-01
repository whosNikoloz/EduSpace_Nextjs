import React from "react";

interface OutputTerminalProps {
  outputDetails: string;
}
const containerStyle = {
  height: "85vh", // Set the desired height here
};

const OutputTerminal: React.FC<OutputTerminalProps> = ({ outputDetails }) => {
  return (
    <div className="w-full" style={containerStyle}>
      <div
        style={containerStyle}
        className=" inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-neutral-800 pb-6 pt-4  leading-normal overflow-hidden"
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

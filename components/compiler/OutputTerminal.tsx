import React, { useEffect, useState } from "react";

interface OutputTerminalProps {
  outputDetails: string;
  DarkMode: boolean;
  Height: string;
  Error: string;
}

const OutputTerminal: React.FC<OutputTerminalProps> = ({
  outputDetails,
  DarkMode,
  Height,
  Error,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("#24292E");
  const [textColor, setTextColor] = useState<string>("white");
  const [dollarColor, setDollarColor] = useState<string>("white");
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setBackgroundColor(DarkMode ? "#24292E" : "#fff");
  }, [DarkMode]);

  useEffect(() => {
    setTextColor(Error && Error.trim() !== "" ? "red" : "white");
    setDollarColor(Error && Error.trim() !== "" ? "red" : "white");
  }, [Error]);

  useEffect(() => {
    if (outputDetails && outputDetails.trim() !== "") {
      const intervalDuration = 800 / outputDetails.length;

      const timer = setInterval(() => {
        const char = outputDetails.charAt(currentIndex);
        setCurrentText((prevText) =>
          char === "\n" ? prevText + "<br />" : prevText + char
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, intervalDuration);

      return () => clearInterval(timer);
    } else {
      setCurrentText("");
      setCurrentIndex(0);
    }
  }, [outputDetails, currentIndex, currentText]);

  return (
    <div className="w-full">
      <div
        className={`inverse-toggle px-5 shadow-lg text-sm font-mono subpixel-antialiased pb-6 leading-normal overflow-hidden`}
        style={{
          height: Height,
          backgroundColor: backgroundColor,
        }}
      >
        <div className="flex">
          <div className="flex-1 typing items-center pl-2">
            <span
              style={{ color: textColor }}
              dangerouslySetInnerHTML={{ __html: currentText }}
            />
            {Error && Error.trim() !== "" && (
              <div style={{ color: "red" }}>Error: {Error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputTerminal;

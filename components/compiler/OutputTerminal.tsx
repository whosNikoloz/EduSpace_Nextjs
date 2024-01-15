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
  const [backgroundColor, setBackgroundColor] = useState("#24292E");
  const [textColor, setTextColor] = useState("white");
  const [dollarColor, setDollarColor] = useState("white");
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (DarkMode) {
      setBackgroundColor("#24292E");
    } else {
      setBackgroundColor("#fff");
    }
  }, [DarkMode]);

  useEffect(() => {
    if (typeof Error === "string" && Error.trim() !== "") {
      setTextColor("red");
    } else {
      setTextColor("white");
    }
  }, [Error]);

  useEffect(() => {
    setDollarColor(
      typeof Error === "string" && Error.trim() !== "" ? "red" : "white"
    );
  }, [Error]);

  useEffect(() => {
    if (outputDetails && outputDetails.trim() !== "") {
      const intervalDuration = 800 / outputDetails.length; // Adjust the factor as needed
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
  }, [outputDetails, currentIndex]);

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
          <div className="flex-1 typing items-center pl-2">
            <span
              style={{ color: textColor }}
              dangerouslySetInnerHTML={{ __html: currentText }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputTerminal;

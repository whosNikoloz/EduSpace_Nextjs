import React, { useRef } from "react";
import { useInView } from "framer-motion";
import classNames from "classnames";
import { useStepStore } from "./store";
import { Image } from "@nextui-org/react";

type StepsContent = {
  children: React.ReactNode; // 'children' instead of 'Children'
  gradient: string;
} & ContentProps;

type ContentProps = {
  id: string;
};

const StepsContent = ({ children, gradient, id }: StepsContent) => {
  const inViewStep = useStepStore((state) => state.inViewStep);

  return (
    <div
      className={classNames(
        "absolute inset-0 w-full h-[400px] rounded-2xl bg-gradient-to-br transition-opacity",
        gradient,
        inViewStep === id ? "opacity-100" : "opacity-0"
      )}
    >
      {children}
    </div>
  );
};

export const FirstContent = ({ id }: ContentProps) => {
  return (
    <StepsContent id={id} gradient="from-[#FFD700] to-[#FFA500]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover rounded-2xl w-full h-full"
      >
        <source src="/selftg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </StepsContent>
  );
};

export const SecondContent = ({ id }: ContentProps) => {
  return (
    <StepsContent id={id} gradient="from-[0] to-[0]">
      <div className="bg-black text-white p-6 rounded-2xl w-full h-[400px]  font-mono">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm">ubuntu@eduspace: ~</div>
        </div>
        <div className="mt-4">
          <div className="text-white">
            <span className="text-green-400">ubuntu@eduspace: </span>$ cd
            Programming Languages
          </div>
          <div className="text-white">
            <span className="text-green-400">
              ubuntu@eduspace:
              <span className="text-blue-300">~/Programming Languages </span>
            </span>
            $ ls -a
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <div className="text-white ml-4">
              <span className="text-blue-300">Python</span>: Versatile,
              readable, used for web dev, data analysis, AI, and more.
            </div>
            <div className="text-white ml-4">
              <span className="text-blue-300">Java</span>: Object-oriented,
              `write once, run anywhere`, for Android, enterprise apps, web.
            </div>
            <div className="text-white ml-4">
              <span className="text-blue-300">JavaScript</span>: Dynamic, for
              web dev, interactive elements, client-side scripting.
            </div>
            <div className="text-white ml-4">
              <span className="text-blue-300">Swift</span>: Efficient, high
              performance, for system/software, games.
            </div>
            <div className="text-white ml-4">
              <span className="text-blue-300">C#</span>: Modern, for Windows
              apps, games (Unity), enterprise software.
            </div>
            <div className="text-white ml-4">
              <span className="text-blue-300">Swift</span>: Apple`s iOS/macOS
              app development, safety, performance.
            </div>
          </div>
          <div className="text-white mt-1">
            <span className="text-green-400">
              ubuntu@eduspace:
              <span className="text-blue-300">~/Programming Languages </span>
            </span>
            $ |
          </div>
        </div>
      </div>
    </StepsContent>
  );
};

export const ThirdContent = ({ id }: ContentProps) => {
  return (
    <StepsContent id={id} gradient="from-[#FF6347] to-[#FF4500]">
      <span className="text-black text-6xl">Content</span>
    </StepsContent>
  );
};

export const FourthContent = ({ id }: ContentProps) => {
  return (
    <StepsContent id={id} gradient="from-[#00CED1] to-[#4682B4]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover rounded-2xl w-full h-full"
      >
        <source src="/disscus.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </StepsContent>
  );
};

export const FifthContent = ({ id }: ContentProps) => {
  return (
    <StepsContent id={id} gradient="from-[#FFD700] to-[#FFA500]">
      <p className="text-black text-6xl">Content</p>
    </StepsContent>
  );
};

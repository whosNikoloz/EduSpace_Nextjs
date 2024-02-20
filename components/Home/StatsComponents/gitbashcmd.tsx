import React from "react";
import { GitBashIcon } from "../../icons";
const Typewriter = dynamic(() => import("typewriter-effect"), {
  ssr: false, // Disable server-side rendering for this component
});
import dynamic from "next/dynamic";

export const GitBashCMD = () => {
  return (
    <div className=" flex items-center justify-center text-start">
      <div className="w-3/4 mx-auto">
        <div className="w-full md:h-96 h-64 shadow-2xl subpixel-antialiased rounded bg-[#161b22]  border-2 border-gray-800 mx-auto">
          <div
            className="flex items-center h-8 rounded-t bg-gray-900  text-center text-black"
            id="headerTerminal"
          >
            <div
              className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
              id="closebtn"
            ></div>
            <div
              className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"
              id="minbtn"
            ></div>
            <div
              className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"
              id="maxbtn"
            ></div>
            <div className="mx-auto pr-16 flex items-center" id="terminaltitle">
              <GitBashIcon size={23} height={0} width={0} />
              <p className="text-center text-xs text-white ml-1">MINGW64:/</p>
            </div>
          </div>
          <div
            className="pl-1 pt-1 h-auto text-gray-300 font-mono text-xs bg-grey-900"
            id="console"
          >
            <p className="pt-1">
              <code className="text-green-600 ">EduSpace@whosNikoloz</code>
              <code className="text-purple-500"> MINGW64</code>
              <code className="text-yellow-500">
                {" "}
                ~/OneDrive/desktop/eduspace
              </code>
              <code className="text-green-300"> (main)</code>
            </p>
            <div className="pb-1">
              <code> $ git status</code>
            </div>
            <div>
              <code> On branch main</code>
            </div>
            <div>
              <code>Your branch is up to date with {"'origin/main'"}.</code>
            </div>
            <div className="pt-2">
              <code>Changes not staged for commit:</code>
            </div>
            <div>
              <code>nothing to commit, working tree clean</code>
            </div>
            <div className="pt-1">
              <code className="text-green-600 ">EduSpace@whosNikoloz</code>
              <code className="text-purple-500"> MINGW64</code>
              <code className="text-yellow-500">
                {" "}
                ~/OneDrive/desktop/eduspace
              </code>
              <code className="text-green-300"> (main)</code>
            </div>
            <div className="pb-1 flex items-center gap-2">
              <code>$</code>
              <code>
                <Typewriter
                  options={{
                    strings: [
                      "git commit",
                      "git push",
                      "git add .",
                      "git დაიწყე სწავლა 🤙",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

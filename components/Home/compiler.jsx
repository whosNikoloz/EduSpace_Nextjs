"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { defineTheme } from "@/app/themes/defineThemes";
import OutputTerminal from "@/components/compiler/OutputTerminal";
import { EduSpace } from "../EduSpaceLogo";
import { Button } from "@nextui-org/react";
import { RunIcon } from "../compiler/RunIcon";

export const Compiler = () => {
  const [code, setCode] = useState(
    `using System;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        string Name = "EduSpace";

        //Change Name With Your Name and Run

        Console.WriteLine ($"Hello {Name}!");
    }
}`
  );
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      defineTheme("githubdark");
    } else {
      defineTheme("githublight");
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col border border-gray-500">
      {/* EduSpace */}
      <div className="text-3xl font-bold p-2">
        <EduSpace />
      </div>

      {/* Middle containers */}
      <div className="flex flex-col lg:flex-row border-t border-gray-500">
        {/* Left container */}
        <div className="flex-1 lg:border-r border-gray-500">
          {/* Nested container 1 */}
          <div className="flex-1 border-b border-gray-500 p-2 text-left">
            <p>Code</p>
          </div>

          {/* Nested container 2 */}
          <div className="flex-1 border-b border-gray-500">
            <Editor
              height="40vh"
              width="100%"
              language="csharp"
              value={code}
              theme={isDarkMode ? "githubdark" : "githublight"}
              defaultValue="// some comment"
            />
          </div>
        </div>

        {/* Right container */}
        <div className="flex-1">
          {/* Nested container 3 */}
          <div className="flex-1 lg:w-full border-b  border-gray-500 p-2 text-right">
            <p>Output</p>
          </div>

          {/* Nested container 4 */}
          <div className="flex-1 lg:w-full text-start border-b  border-gray-500">
            <OutputTerminal Height="40vh" DarkMode outputDetails="test" />
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold  p-2 text-right">
        <Button
          color="primary"
          isLoading={false}
          onClick={() => handleTabChange("Output")}
          isIconOnly
        >
          <RunIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

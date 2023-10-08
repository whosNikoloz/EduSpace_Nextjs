"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { defineTheme } from "@/app/themes/defineThemes";
import OutputTerminal from "@/components/compiler/OutputTerminal";
import { EduSpace } from "../EduSpaceLogo";
import { Button } from "@nextui-org/react";
import { RunIcon } from "../compiler/RunIcon";

export const Compiler = ({ code, isDarkMode, onChange }) => {
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
              height="37vh"
              width="100%"
              language="csharp"
              value={code}
              onChange={onChange}
              theme={isDarkMode ? "githubdark" : "githublight"}
              defaultValue="// some comment"
              options={{
                fontSize: 12, // Adjust the font size as needed
                minimap: { enabled: false }, // Optional minimap configuration
              }}
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
            <OutputTerminal Height="37vh" DarkMode outputDetails="test" />
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold  p-2 text-right">
        <Button
          color="primary"
          isLoading={false}
          onClick={() => handleTabChange("Output")}
        >
          <RunIcon size={20} /> კომპილაცია
        </Button>
      </div>
    </div>
  );
};

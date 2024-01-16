"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { defineTheme } from "@/app/themes/defineThemes";
import OutputTerminal from "@/components/compiler/OutputTerminal";
import { EduSpace } from "../EduSpaceLogo";
import { Button } from "@nextui-org/react";
import { RunIcon } from "../compiler/RunIcon";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";

export const Compiler = ({ code, isDarkMode, onChange }) => {
  useEffect(() => {
    if (isDarkMode) {
      defineTheme("githubdark");
    } else {
      defineTheme("githublight");
    }
  }, [isDarkMode]);
  const [Compiling, setCompiling] = useState(false);
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("code");
  const [error, setError] = useState(false);
  const [connection, setConnection] = useState(null);

  const initializeSignalR = async () => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7257/csharpTerminal")
        .configureLogging(LogLevel.Information)
        .build();

      await conn.start();

      return conn; // Return the connection object after a successful start
    } catch (error) {
      console.error("Error during connection:", error);
      throw error; // Propagate the error
    }
  };

  useEffect(() => {
    connection?.on("ReceiveCompilationUpdate", (output) => {
      setOutput(output.output);
      setError(output.error);
      setCompiling(false);
    });
  }, [connection]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const compileCode = async () => {
    setCompiling(true);
    try {
      const conn = await initializeSignalR(); // Wait for the connection to be established
      setConnection(conn);
      setOutput("");
      setError("");
      setTimeout(async () => {
        await conn?.invoke("CompileAndExecuteCode", code); // Use conn, not connection
      }, 500);
    } catch (error) {
      console.error("Error during compilation:", error);
      setError("Error during compilation"); // Update the error state
      setCompiling(false);
    }
  };

  return (
    <div className="flex flex-col border border-gray-500">
      {/* EduSpace */}
      <div className="text-3xl font-bold p-2">
        <EduSpace />
      </div>

      {/* Main content */}
      {/* Two-column layout for larger screens */}
      <div className="flex flex-col border border-gray-500">
        {/* Main content */}

        {/* Two-column layout for larger screens */}
        <div className="hidden lg:flex sm:hidden lg:flex-row border-t border-gray-500">
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
                  fontSize: 11, // Adjust the font size as needed
                  minimap: { enabled: false }, // Optional minimap configuration
                  scrollbar: { vertical: "hidden", horizontal: "hidden" },
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
              <OutputTerminal
                Height="37vh"
                DarkMode
                outputDetails={output}
                Error={error}
              />
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="p-2 space-x-2 border-b">
            <Button
              variant="bordered"
              radius="none"
              onClick={() => handleTabChange("code")}
              className={activeTab === "code" ? "bg-blue-500 text-white" : ""}
            >
              Code
            </Button>
            <Button
              variant="bordered"
              radius="none"
              onClick={() => handleTabChange("output")}
              className={activeTab === "output" ? "bg-blue-500 text-white" : ""}
            >
              Output
            </Button>
          </div>
          {activeTab === "code" && (
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
                  fontSize: 10,
                  minimap: { enabled: false },
                }}
              />
            </div>
          )}
          {activeTab === "output" && (
            <div className="flex-1 lg:w-full text-start border-b  border-gray-500">
              <OutputTerminal
                Height="37vh"
                DarkMode
                outputDetails={output}
                Error={error}
              />
            </div>
          )}
        </div>

        {/* Button */}
        <div className="text-3xl font-bold p-2 text-right">
          <Button
            color="primary"
            variant="shadow"
            isLoading={Compiling}
            onClick={() => compileCode()}
          >
            <RunIcon size={20} /> კომპილაცია
          </Button>
        </div>
      </div>
    </div>
  );
};

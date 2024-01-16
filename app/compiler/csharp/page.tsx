"use client";

import React, { useState, useEffect, use } from "react";
import LayoutNavbar from "@/app/layouts/LayoutNavbar";
import { Link } from "@nextui-org/link";
import CodeEditorWindow from "@/components/compiler/MonacoEditorWrapper";
import OutputTerminal from "@/components/compiler/OutputTerminal";
import { Button } from "@nextui-org/react";
import { RunIcon } from "@/components/compiler/RunIcon";
import { MoonIcon } from "@/components/compiler/MoonIcon";
import { SunIcon } from "@/components/compiler/SunIcon";
import { PythonIcon } from "@/components/compiler/PythonIcon";
import { CsharpIcon } from "@/components/compiler/CsharpIcon";
import { CppIcon } from "@/components/compiler/CppIcon";
import { JavaIcon } from "@/components/compiler/JavaIcon";
import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
} from "@microsoft/signalr";

export default function CompilerPage() {
  const [code, setCode] = useState(
    `
using System;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello EduSpace!");
    }
}`
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("Main.cs");
  const [compiling, setCompiling] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);

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
    connection?.on("ReceiveCompilationUpdate", (output: any) => {
      setOutput(output.output);
      setError(output.error);
      setCompiling(false);
    });
  }, [connection]);

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

  const handleClear = () => {
    setOutput("");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const handleCodeChange = (newCode: React.SetStateAction<string>) => {
    setCode(newCode);
  };
  return (
    <LayoutNavbar>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="p-4 md:border-b border-blue-600 rounded-br-lg">
          <div className="flex flex-row md:flex-col md:mb-1 items-start gap-7">
            {/* Use flex-col to arrange items vertically */}
            <div className="mb-2">
              <Link href="/compiler/csharp">
                <Button
                  isIconOnly
                  className="bg-transparent border-2 border-blue-600"
                >
                  <CsharpIcon size={35} />
                </Button>
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/compiler/python">
                <Button isIconOnly className="bg-transparent   ">
                  <PythonIcon size={35} />
                </Button>
              </Link>
            </div>
            <div>
              <Link href="/compiler/cpp">
                <Button isIconOnly className="bg-transparent  ">
                  <CppIcon size={35} />
                </Button>
              </Link>
            </div>
            <div>
              <Link href="/compiler/java">
                <Button isIconOnly className="bg-transparent  ">
                  <JavaIcon size={35} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        {/* Two-column layout for larger screens */}
        <div className="hidden sm:block w-full">
          <div className="flex-1 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-t md:border-l border-blue-600 rounded-l-lg ">
                <div className="flex justify-between items-center px-4">
                  <h2 className="text-xl font-semibold mb-2">Main.cs</h2>
                  <div className="mb-2 d-flex gap-2">
                    {" "}
                    {/* Add d-flex class to create a flex container */}
                    <Button
                      color="primary"
                      className="py-2 mt-4 mr-1"
                      isIconOnly
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? (
                        <SunIcon size={20} />
                      ) : (
                        <MoonIcon size={20} />
                      )}
                    </Button>
                    <Button
                      color="primary"
                      isLoading={compiling}
                      onClick={compileCode}
                      className="py-2"
                    >
                      <RunIcon size={20} />
                      კომპილაცია
                    </Button>
                  </div>
                </div>
                <CodeEditorWindow
                  code={code}
                  onChange={handleCodeChange}
                  language={"csharp"}
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="border-t border-blue-600">
                <div className="flex justify-between items-center px-4">
                  <h2 className="text-xl font-semibold mb-2">Output</h2>
                  <div>
                    <Button
                      isLoading={false}
                      color="primary"
                      className="mb-2 px-4 py-2 mt-4"
                      onClick={handleClear}
                    >
                      გასუფთავება
                    </Button>
                  </div>
                </div>
                <OutputTerminal
                  outputDetails={output}
                  Height="85vh"
                  DarkMode={isDarkMode}
                  Error={error}
                />
              </div>
            </div>
          </div>
        </div>
        {/* One-column layout for smaller screens */}
        <div className="sm:hidden">
          {/* Content for smaller screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div className="border-t md:border-l border-blue-600 md:rounded-l-lg rounded-lg ">
              <div className="flex justify-between items-center px-4">
                {/* Buttons at the beginning */}
                <div className="flex space-x-2 mb-2 items-center">
                  <Button
                    color="primary"
                    className="py-2 mt-4 mr-1"
                    isIconOnly
                    onClick={toggleDarkMode}
                  >
                    {isDarkMode ? (
                      <SunIcon size={20} />
                    ) : (
                      <MoonIcon size={20} />
                    )}
                  </Button>
                </div>
                {/* Buttons in the middle */}
                <div className="flex space-x-2">
                  <Button
                    color="primary"
                    className={`py-2 ${
                      selectedTab === "Main.cs"
                        ? "bg-primary"
                        : "bg-transparent"
                    }`}
                    onClick={() => handleTabChange("Main.cs")}
                  >
                    Main.cs
                  </Button>
                  <Button
                    color="primary"
                    className={`py-2 ${
                      selectedTab === "Output" ? "bg-primary" : "bg-transparent"
                    }`}
                    onClick={() => handleTabChange("Output")}
                  >
                    Output
                  </Button>
                </div>
                {/* Button at the end */}
                {selectedTab !== "Output" ? (
                  /* This is the "if" part */
                  <Button
                    color="primary"
                    isLoading={compiling}
                    onClick={() => {
                      handleTabChange("Output");
                      compileCode();
                    }}
                    isIconOnly
                  >
                    <RunIcon size={20} />
                  </Button>
                ) : (
                  <Button
                    disabled={true}
                    className="bg-transparent"
                    isIconOnly
                  ></Button>
                )}
              </div>

              {selectedTab === "Main.cs" && (
                <CodeEditorWindow
                  code={code}
                  onChange={setCode}
                  language={"csharp"}
                  isDarkMode={isDarkMode}
                />
              )}
              {selectedTab === "Output" && (
                <OutputTerminal
                  outputDetails={output}
                  Height="85vh"
                  DarkMode={isDarkMode}
                  Error={error}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutNavbar>
  );
}

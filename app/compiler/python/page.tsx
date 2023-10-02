"use client";

import React, { useState } from "react";
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

export default function CompilerPage() {
  const [code, setCode] = useState(
    `
# Online Python Editor for free
# Write, Edit, and Run your Python code using Python Online Compiler
    
print("Hello Python World")
  `
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCodeChange = (newCode: React.SetStateAction<string>) => {
    setCode(newCode);
  };

  return (
    <LayoutNavbar>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="p-4">
          <div className="flex flex-row md:flex-col items-start mb-4 gap-4">
            {/* Use flex-col to arrange items vertically */}
            <div className="mb-2">
              <Link href="/compiler/csharp">
                <Button isIconOnly className="bg-transparent ">
                  <CsharpIcon size={35} />
                </Button>
              </Link>
            </div>
            <div className="mb-2">
              <Link href="/compiler/python">
                <Button
                  isIconOnly
                  className="bg-transparent   border-2 border-blue-600 "
                >
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
                <Button isIconOnly className="bg-transparent ">
                  <JavaIcon size={35} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-t md:border-l border-blue-600 rounded-l-lg md:rounded-r-lg">
              <div className="flex justify-between items-center px-4">
                <h2 className="text-xl font-semibold mb-2">Main.cpp</h2>
                <div className="mb-2 d-flex gap-2">
                  {" "}
                  {/* Add d-flex class to create a flex container */}
                  <Button
                    color="primary"
                    className="py-2 mt-4 mr-1"
                    isIconOnly
                    isLoading={false}
                    onClick={toggleDarkMode}
                  >
                    <SunIcon size={20} />
                  </Button>
                  <Button color="primary" isLoading={false} className="py-2">
                    <RunIcon size={20} />
                    კომპილაცია
                  </Button>
                </div>
              </div>
              <CodeEditorWindow
                code={code}
                onChange={handleCodeChange}
                language={"python"}
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
                  >
                    გასუფთავება
                  </Button>
                </div>
              </div>
              <OutputTerminal outputDetails="test" DarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </div>
    </LayoutNavbar>
  );
}

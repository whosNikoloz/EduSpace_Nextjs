"use client";

import React, { useState } from "react";
import { CustomTitle } from "@/components/CustomTitle";
import LayoutNavbar from "../layouts/LayoutNavbar";
import MonacoEditorWrapper from "@/components/compiler/MonacoEditorWrapper";
import OutputTerminal from "@/components/compiler/OutputTerminal";

export default function CompilerPage() {
  const [code, setCode] = useState("function add(a, b) {\n  return a + b;\n}");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCodeChange = (newCode: React.SetStateAction<string>) => {
    setCode(newCode);
  };

  return (
    <LayoutNavbar>
      <CustomTitle title1="Compiler" title2="Compiler" margin={7} />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="p-4 bg-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-gray-800 text-sm">C# 9.0</p>
        </div>

        {/* Main content */}
        <div className="flex-1 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border border-blue-600">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">Main</h2>
                <div className="mb-2">
                  <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 mr-2">
                    Button 1
                  </button>
                  <button className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4">
                    Button 2
                  </button>
                </div>
              </div>
              <MonacoEditorWrapper code={code} onChange={handleCodeChange} />
            </div>

            <div className="border border-blue-600">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-2">Layout</h2>
                <div>
                  <button className="bg-green-500 text-white rounded-lg mb-2 px-4 py-2 mt-4">
                    Button 2
                  </button>
                </div>
              </div>
              <OutputTerminal text="Hello, world!" />
            </div>
          </div>
        </div>
      </div>
    </LayoutNavbar>
  );
}

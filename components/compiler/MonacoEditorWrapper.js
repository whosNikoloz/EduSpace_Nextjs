"use client";

import React, { useState, useEffect } from "react";
import { defineTheme } from "@/app/themes/defineThemes";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, isDarkMode }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value);
  };

  // Use the useEffect hook to change the theme based on isDarkMode
  useEffect(() => {
    if (isDarkMode) {
      defineTheme("githubdark");
    } else {
      defineTheme("githublight");
    }
  }, [isDarkMode]);

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "csharp"}
        value={value}
        theme={isDarkMode ? "githubdark" : "githublight"}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;

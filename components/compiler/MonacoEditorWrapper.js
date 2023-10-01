import React from "react";
import MonacoEditor from "react-monaco-editor";

const MonacoEditorWrapper = ({ code, onChange }) => {
  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  return (
    <MonacoEditor
      width="100%"
      height="500"
      language="javascript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
    />
  );
};

export default MonacoEditorWrapper;
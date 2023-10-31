"use client";

import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Answers } from "./Answers";

interface ContentItem {
  type: "content" | "question";
  text: string;
}

interface ContentProps {
  contentList: ContentItem[];
}

export const Content: React.FC<ContentProps> = ({ contentList }) => {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  return (
    <div className="grid justify-center items-center w-full overflow-auto max-h-[calc(100vh-230px)] overflow-auto h-screen">
      <div className="mt-4">
        სასწავლო კონტენტი სასწავლო კონტენტისასწავლო კონტენტი სასწავლო კონტენტი
      </div>
      <div className="mt-4">სასწავლო კონტენტი</div>

      <CodeEditor
        value={code}
        language="cpp"
        placeholder="Please enter JS code."
        className="rounded-md mt-4"
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: "#171515",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
        readOnly
      />

      <Answers Answer={[]} />
      {contentList.map((item, index) => (
        <div key={index}>
          {item.type === "content" && <p className="content">{item.text}</p>}
          {item.type === "question" && <p className="question">{item.text}</p>}
        </div>
      ))}
    </div>
  );
};

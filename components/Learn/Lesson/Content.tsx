"use client";

import React from "react";
import { Button } from "@nextui-org/react";

interface ContentItem {
  type: "content" | "question";
  text: string;
}

interface ContentProps {
  contentList: ContentItem[];
}

export const Content: React.FC<ContentProps> = ({ contentList }) => {
  return (
    <div style={{ height: "calc(100vh - 230px)", overflow: "auto" }}>
      სასწავლო კონტენტი
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      <div className="flex justify-center mt-4">სასწავლო კონტენტი</div>
      {contentList.map((item, index) => (
        <div key={index}>
          {item.type === "content" && <p className="content">{item.text}</p>}
          {item.type === "question" && <p className="question">{item.text}</p>}
        </div>
      ))}
    </div>
  );
};

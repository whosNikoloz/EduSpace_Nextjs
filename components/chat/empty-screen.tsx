import { UseChatHelpers } from "ai/react";

import { Button } from "@nextui-org/button";
import { IconArrowRight } from "@/components/icons";

interface Message {
  heading: string;
  message: string;
}

interface ExampleMessages {
  [key: string]: Message[];
}

const exampleMessages: ExampleMessages = {
  en: [
    {
      heading: "Explain technical concepts",
      message: `What is a "serverless function"?`,
    },
    {
      heading: "What is OOP?",
      message: "Explain Object Oriented Programming.",
    },
    {
      heading: "Hello World in C#",
      message: `Write a "Hello World" program in C#.`,
    },
  ],
  ka: [
    {
      heading: "ახსენით ტექნიკური ცნებები",
      message: `What is a "serverless function"?`,
    },
    {
      heading: "რა არის OOP?",
      message: "ახსენით ობიექტზე ორიენტირებული პროგრამირება.",
    },
    {
      heading: "Hello World C#-ში",
      message: `Write a "Hello World" program in C#.`,
    },
  ],
};

const pData = {
  en: {
    heading: "Welcome to EduspaceAI",
    paragraph:
      "You can start a conversation here or try the following examples:",
  },
  ka: {
    heading: "Welcome to EduspaceAI",
    paragraph: "შეგიძლიათ დაიწყოთ საუბარი აქ ან სცადოთ შემდეგი მაგალითები:",
  },
};

interface EmptyScreenProps {
  setInput: (value: string) => void;
  lang: keyof ExampleMessages;
}

export function EmptyScreen({ setInput, lang }: EmptyScreenProps) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg  bg-background/30 p-8">
        <h1 className="mb-2 text-lg font-semibold">
          {lang === "ka" ? pData.ka.heading : pData.en.heading}
        </h1>

        <p className="leading-normal text-muted-foreground">
          {lang === "ka" ? pData.ka.paragraph : pData.en.paragraph}
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages[lang].map((message, index) => (
            <Button
              key={index}
              className="h-auto p-0 text-base bg-transparent"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

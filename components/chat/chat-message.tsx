import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import cn from "classnames";

import { CodeBlock } from "@/components/chat/codeblock";
import { MemoizedReactMarkdown } from "@/components/chat/markdown";
import { ChatMessageActions } from "@/components/chat/chat-message-actions";
import { Avatar } from "@nextui-org/react";

export interface ChatMessageProps {
  message: Message;
  forasistant?: boolean;
}

export function ChatMessage({
  message,
  forasistant = false,
  ...props
}: ChatMessageProps) {
  if (forasistant && message.role === "user") {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col md:mb-4 space-x-1 overflow-hidden items-start"
      )}
      {...props}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 select-none items-center justify-around rounded-md shadow"
        )}
      >
        {message.role === "user" ? (
          <>
            <Avatar
              name="Nikoloz Kobaidze"
              size="sm"
              src="https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75"
            />
            <p className="ml-3 mb-2 text-md font-bold">You</p>
          </>
        ) : (
          <>
            <Avatar
              name="Eduspace AI"
              size="sm"
              src="https://firebasestorage.googleapis.com/v0/b/eduspace-a81b5.appspot.com/o/EduSpaceLogo.png?alt=media&token=7b7dc8a5-05d8-4348-9b4c-c19913949c67"
            />
            <p className="ml-3 mb-2 text-md font-bold">EduspaceAI</p>
          </>
        )}
      </div>
      <div className="flex px-1 ml-4 space-y-2 justify-around flex-row overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed mb-2 ml-9 prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, className, children, ...props }) {
              if (children && Array.isArray(children) && children.length > 0) {
                // Check if children exists, is an array, and has elements
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }
              // Return the code component JSX

              const match = /language-(\w+)/.exec(className || "");

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>

        <ChatMessageActions message={message} />
      </div>
    </div>
  );
}

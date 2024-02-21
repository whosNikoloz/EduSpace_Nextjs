"use client";

import { type Message } from "ai";
import cn from "classnames";
import { Button } from "@nextui-org/react";
import { IconCheck, IconCopy } from "@/components/icons";

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  message: Message;
}

export function ChatMessageActions({
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(message.content);
  };

  return (
    <Button
      variant="ghost"
      className="ml-4 bottom-2   transition-opacity hover:opacity-100  md:opacity-0"
      size="sm"
      isIconOnly
      onClick={onCopy}
    >
      {isCopied ? <IconCheck /> : <IconCopy />}
      <span className="sr-only">Copy message</span>
    </Button>
  );
}

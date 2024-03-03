"use client";

import React, { useState, FormEvent, Suspense } from "react";
import { Fab, Action } from "react-tiny-fab";
import { EduSpace } from "./EduSpaceLogo";
import { IconOpenAI, UpVector } from "./icons";
import { useDisclosure, Button, Textarea } from "@nextui-org/react";
import { useChat } from "ai/react"; // Assuming this is your custom chat hook
import { useUser } from "@/app/dbcontext/UserdbContext";
import { useRouter } from "next/navigation";
import { EmptyScreen } from "@/components/chat/empty-screen";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Modal = dynamic(() =>
  import("@nextui-org/react").then((module) => module.Modal)
);
const ModalContent = dynamic(() =>
  import("@nextui-org/react").then((module) => module.ModalContent)
);
const ModalHeader = dynamic(() =>
  import("@nextui-org/react").then((module) => module.ModalHeader)
);
const ModalBody = dynamic(() =>
  import("@nextui-org/react").then((module) => module.ModalBody)
);
const ModalFooter = dynamic(() =>
  import("@nextui-org/react").then((module) => module.ModalFooter)
);
const ChatMessage = dynamic(() =>
  import("./chat/chat-message").then((module) => module.ChatMessage)
);

const FAB: React.FC<{ lang: string }> = ({ lang }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { messages, input, setInput, handleSubmit } = useChat();
  const { user } = useUser();
  const router = useRouter();

  const { theme } = useTheme();

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [userCount, setUserCount] = useState(0);
  const maxUserLimit = 10; // Set your desired maximum user limit

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    if (input) {
      handleSubmit(e);
      setInput("");
    }
  };

  const openChat = () => {
    // if (userCount < maxUserLimit) {
    //   if (user) {
    //   } else {
    //     router.push("/user/auth");
    //   }
    // } else {
    //   alert("Chat limit reached. Please try again later."); // Display a message or handle accordingly
    // }
    onOpen();
  };

  return (
    <>
      <Fab
        mainButtonStyles={{ backgroundColor: "transparent" }}
        alwaysShowTitle={false}
        icon={<EduSpace />}
        style={{
          visibility: isOpen ? "hidden" : "visible",
          bottom: 5,
          right: 5,
        }}
      >
        <Action
          text="Chat"
          style={{ backgroundColor: "transparent" }}
          onClick={openChat}
        >
          <IconOpenAI
            size={30}
            height={undefined}
            width={undefined}
            theme={theme}
          />
        </Action>
        <Action
          style={{ backgroundColor: "transparent" }}
          onClick={scrollToTop}
        >
          <UpVector size={30} theme={theme} />
        </Action>
      </Fab>
      <Suspense fallback={<div>Loading...</div>}>
        <Modal
          scrollBehavior="inside"
          backdrop="opaque"
          size="3xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: 20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex flex-col space-y-1.5 ">
                    <h2 className="font-semibold text-lg tracking-tight">
                      EduSpace Chat
                    </h2>
                    <p className="text-sm text-[#6b7280] leading-3">
                      Powered by Nika
                    </p>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div
                    className="w-full h-[474px]"
                    style={{ minWidth: "100%", display: "table" }}
                  >
                    {messages.length > 0 ? (
                      messages.map((m) => (
                        <ChatMessage message={m} key={m.id} />
                      ))
                    ) : (
                      <EmptyScreen setInput={setInput} lang={lang} />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="flex items-center pt-0">
                  <form
                    className="flex items-center justify-center w-full space-x-2"
                    onSubmit={handleSubmitForm}
                  >
                    <Textarea
                      variant="bordered"
                      classNames={{
                        input: ["text-[16px] "],
                      }}
                      minRows={1}
                      value={input}
                      onValueChange={setInput}
                      placeholder={
                        lang === "en"
                          ? "Message EduSpaceAI..."
                          : "შეიყვანეთ შეტყობინება EduSpaceAI..."
                      }
                      className="w-2xl"
                    />
                    <Button
                      type="submit"
                      onClick={() => setUserCount((prevCount) => prevCount + 1)}
                      isIconOnly
                      className="bg-transparent"
                      size="sm"
                    >
                      <UpVector size={20} />
                    </Button>
                  </form>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Suspense>
    </>
  );
};

export default FAB;

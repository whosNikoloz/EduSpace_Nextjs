"use client";

import React, { useState, useEffect } from "react";
import { Fab, Action } from "react-tiny-fab";
import { Button } from "@nextui-org/button";
import { UpVectorIcon } from "./UpVectorIcon";
import { EduSpace } from "./EduSpaceLogo";
import { ChatIcon } from "./ChatIcon";
import { useChat } from "ai/react";
import { useUser } from "@/app/dbcontext/UserdbContext";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from "@nextui-org/react";

const FAB: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { user } = useUser();
  const router = useRouter();

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [userCount, setUserCount] = useState(0);
  const maxUserLimit = 10; // Set your desired maximum user limit

  const openChat = () => {
    if (userCount < maxUserLimit) {
      if (user) {
        onOpen();
      } else {
        router.push("/user/auth");
      }
    } else {
      alert("Chat limit reached. Please try again later."); // Display a message or handle accordingly
    }
  };

  return (
    <Fab
      mainButtonStyles={{ backgroundColor: "transparent" }}
      alwaysShowTitle={false}
      icon={<EduSpace />}
      style={{
        bottom: 5,
        right: 5,
      }}
    >
      <Action
        text="Chat"
        style={{ backgroundColor: "transparent" }}
        onClick={openChat}
      >
        <Modal
          scrollBehavior="inside"
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                x: 20,
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
                    className="pr-4 h-[474px]"
                    style={{ minWidth: "100%", display: "table" }}
                  >
                    {messages.length > 0
                      ? messages.map((m) => (
                          <div
                            key={m.id}
                            className="flex gap-3 my-4 text-gray-600 dark:text-white text-sm flex-1"
                          >
                            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                              <div className="rounded-full bg-gray-100">
                                {m.role === "user" ? (
                                  <>
                                    <Image src={user?.picture} alt="user" />
                                  </>
                                ) : (
                                  <EduSpace />
                                )}
                              </div>
                            </span>
                            <p className="leading-relaxed dark:text-white">
                              <span className="block font-bold text-gray-700 dark:text-blue-600">
                                {m.role === "user"
                                  ? user?.userName
                                  : "EduSpace"}
                              </span>
                              {m.content}
                            </p>
                          </div>
                        ))
                      : null}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <div className="flex items-center pt-0">
                    <form
                      className="flex items-center justify-center w-full space-x-2"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="flex h-10 w-full rounded-lg border border-[#e5e7eb] px-3 py-2 dark:text-white text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                        placeholder="Type your message"
                        onChange={handleInputChange}
                        value={input}
                      />
                      <Button
                        type="submit"
                        className="text-sm font-medium bg-black text-white  hover:bg-blue-600 h-10 px-4 py-2"
                        onClick={() =>
                          setUserCount((prevCount) => prevCount + 1)
                        }
                      >
                        Send
                      </Button>
                    </form>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <ChatIcon size={30} height={undefined} width={undefined} />
      </Action>
      <Action style={{ backgroundColor: "transparent" }} onClick={scrollToTop}>
        <UpVectorIcon size={30} />
      </Action>
    </Fab>
  );
};

export default FAB;

"use client";

import React, { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { useUser } from "@/app/dbcontext/UserdbContext";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export const ChatAI = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { user, logout } = useUser();

  return (
    <>
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
                <div className="flex flex-col space-y-1.5 pb-6">
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
                                  <img src={user?.picture} alt="user" />
                                </>
                              ) : (
                                <EduSpace />
                              )}
                            </div>
                          </span>
                          <p className="leading-relaxed dark:text-white">
                            <span className="block font-bold text-gray-700 dark:text-blue-600">
                              {m.role === "user" ? user?.userName : "EduSpace"}
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
    </>
  );
};

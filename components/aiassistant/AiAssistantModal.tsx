import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ChatMessage } from "../chat/chat-message";
import { useChat } from "ai/react";
import { ChatRequestOptions } from "ai";

interface AiAssistantModalProps {
  isOpen: boolean;
  onRequestCloseModal: () => void;
  question: string;
  userAnswer: string;
  content: string;
}

const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onRequestCloseModal,
  question,
  userAnswer,
  content,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Flag to prevent multiple submissions
  const { onClose } = useDisclosure();
  // const { messages, input, setInput, handleSubmit } = useChat();

  // const prompt = `
  //   I have a student who answered a question incorrectly on our learning platform. Here is the information:

  //   **Question:** ${question}
  //   **User's Answer:** ${userAnswer}

  //   Please provide guidance to help the student understand the correct answer and offer a brief explanation. The correct answer should be provided. Thank you!
  // `;

  // const handleSubmitForm = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (input) {
  //       handleSubmit(e);
  //       setInput(""); // Clear input after submission
  //     }
  //   },
  //   [input, handleSubmit, setInput]
  // );

  // const submitPrompt = useCallback(() => {
  //   setInput(prompt);

  //   // Create a synthetic event object
  //   const syntheticEvent = {
  //     preventDefault: () => {},
  //   } as React.FormEvent<HTMLFormElement>;

  //   try {
  //     handleSubmitForm(syntheticEvent);
  //   } catch (error) {
  //     console.error("Error during handleSubmit:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [prompt, handleSubmitForm, setInput]);

  // useEffect(() => {
  //   if (isOpen && !hasSubmitted) {
  //     setIsLoading(true);
  //     submitPrompt();
  //     setHasSubmitted(true); // Set flag to prevent multiple submissions
  //   }
  // }, [isOpen, hasSubmitted, submitPrompt]);

  const handleRequestClose = () => {
    onRequestCloseModal();
    onClose();
  };

  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      onClose={handleRequestClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Ai Assistant 🧑‍🚀
        </ModalHeader>
        <ModalBody>
          <h1 className="font-bold">{content}</h1>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="shadow" onPress={handleRequestClose}>
            Next
          </Button>
          {/* <Button color="primary" variant="shadow" onPress={handleRequestClose}>
            Get Data
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AiAssistantModal;

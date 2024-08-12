import React, { useEffect, useState } from "react";
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
import { EmptyScreen } from "../chat/empty-screen";
import { useChat } from "ai/react";
interface AiAssistantModalProps {
  isOpen: boolean;
  onRequestCloseModal: () => void;
  question: string;
  userAnswer: string;
}

const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onRequestCloseModal,
  question,
  userAnswer,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { onClose } = useDisclosure();
  const { messages, input, setInput, handleSubmit } = useChat();

  const prompt = `
      I have a student who answered a question incorrectly on our learning platform. Here is the information:

      **Question:** ${question}
      **User's Answer:** ${userAnswer}

      Please provide guidance to help the student understand the correct answer and offer a brief explanation. The correct answer should be provided. Thank you!
    `;

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      console.log("Prompt: ", prompt);
      //   const syntheticEvent = {} as React.FormEvent<HTMLFormElement>;
      //   setInput(prompt);
      //   handleSubmit(syntheticEvent);
      setIsLoading(false);
    }
  }, [isOpen, question, userAnswer, handleSubmit, setInput]);

  const handleRequestClose = () => {
    onRequestCloseModal();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleRequestClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{question}</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <h1>Loading...</h1>
            </div>
          ) : messages.length > 0 ? (
            messages.map((m) => <ChatMessage message={m} key={m.id} />)
          ) : (
            <h1>No Message</h1>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={handleRequestClose}>
            Okay
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AiAssistantModal;

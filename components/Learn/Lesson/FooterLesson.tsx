import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { HintIcon } from "@/components/icons";

type FooterLessonProps = {
  onPrev: () => void;
  onContinue: () => void;
  contentFooter: string;
  onFinish: () => void;
  onTryAgain: (needsAIHelp: boolean) => void;
  onFinished: () => void;
  answerSelected: string;
  answerSelectedCorrect: boolean;
  Hint: string;
};

export const FooterLesson: React.FC<FooterLessonProps> = ({
  onPrev,
  onContinue,
  onFinish,
  onFinished,
  onTryAgain,
  Hint,
  contentFooter,
  answerSelected,
  answerSelectedCorrect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  let footerContent = null;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleTryAgainClick = () => {
    setIsPopoverOpen(true);
  };

  const handleAIHelpDecision = (needsAiHelp: boolean) => {
    setIsPopoverOpen(false);
    onTryAgain(needsAiHelp);
  };

  switch (contentFooter) {
    case "first":
      footerContent = (
        <Button
          radius="sm"
          size="md"
          variant="shadow"
          color="primary"
          className="w-11/12 md:w-auto"
          onClick={onContinue}
        >
          შემდეგ
        </Button>
      );
      break;
    case "test":
      footerContent = (
        <>
          <Button
            size="md"
            color="primary"
            variant="flat"
            radius="sm"
            className="w-auto "
            onClick={onPrev}
          >
            უკან
          </Button>
          <Popover
            isOpen={isOpen}
            backdrop="opaque"
            onOpenChange={(open) => setIsOpen(open)}
            color="primary"
          >
            <PopoverTrigger>
              <Button radius="sm" className="w-auto bg-transparent" isIconOnly>
                <HintIcon size={30} height={30} width={30} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-tiny">{Hint}</div>
              </div>
            </PopoverContent>
          </Popover>
          {answerSelected != "" ? (
            answerSelectedCorrect ? (
              <Button
                color="primary"
                radius="sm"
                size="md"
                variant="shadow"
                className="w-auto"
                onClick={onContinue}
              >
                შემდეგ
              </Button>
            ) : (
              <Popover
                isOpen={isPopoverOpen}
                backdrop="opaque"
                onOpenChange={(open) => setIsPopoverOpen(open)}
                color="primary"
              >
                <PopoverTrigger>
                  <Button
                    color="primary"
                    radius="sm"
                    size="md"
                    variant="shadow"
                    className="w-auto"
                    onClick={handleTryAgainClick}
                  >
                    თავიდან ცდა
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2 space-y-4">
                    <div className="text-small font-bold text-center">
                      გსურთ AI დახმარება?
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button
                        variant="shadow"
                        color="success"
                        className="text-white"
                        onClick={() => handleAIHelpDecision(true)}
                      >
                        დიახ
                      </Button>
                      <Button
                        color="danger"
                        variant="shadow"
                        onClick={() => handleAIHelpDecision(false)}
                      >
                        არა
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          ) : null}
        </>
      );
      break;
    case "last":
      footerContent = (
        <>
          <Button
            color="primary"
            variant="flat"
            radius="sm"
            size="md"
            className="w-auto"
            onClick={onPrev}
          >
            უკან
          </Button>
          <Popover
            isOpen={isOpen}
            backdrop="opaque"
            onOpenChange={(open) => setIsOpen(open)}
            color="primary"
          >
            <PopoverTrigger>
              <Button radius="sm" className="w-auto bg-transparent" isIconOnly>
                <HintIcon size={30} height={30} width={30} />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold text-center">
                  მინიშნება
                </div>
                <div className="text-tiny">{Hint}</div>
              </div>
            </PopoverContent>
          </Popover>
          {answerSelected != "" ? (
            answerSelectedCorrect ? (
              <Button
                color="primary"
                radius="sm"
                size="md"
                variant="shadow"
                className="w-auto"
                onClick={onFinish}
              >
                დამთავრება
              </Button>
            ) : (
              <>
                <Popover
                  isOpen={isPopoverOpen}
                  backdrop="opaque"
                  onOpenChange={(open) => setIsPopoverOpen(open)}
                  color="primary"
                >
                  <PopoverTrigger>
                    <Button
                      color="primary"
                      radius="sm"
                      size="md"
                      variant="shadow"
                      className="w-auto"
                      onClick={handleTryAgainClick}
                    >
                      თავიდან ცდა
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2 space-y-4">
                      <div className="text-small font-bold text-center">
                        გსურთ AI დახმარება?
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button
                          variant="shadow"
                          color="success"
                          className="text-white"
                          onClick={() => handleAIHelpDecision(true)}
                        >
                          დიახ
                        </Button>
                        <Button
                          color="danger"
                          variant="shadow"
                          onClick={() => handleAIHelpDecision(false)}
                        >
                          არა
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )
          ) : null}
        </>
      );
      break;
    case "finished":
      footerContent = (
        <>
          <Button
            color="primary"
            radius="sm"
            size="md"
            variant="shadow"
            className="w-auto"
            onClick={onFinished}
          >
            შემდეგ
          </Button>
        </>
      );
      break;
    case "learn":
      footerContent = (
        <>
          <Button
            color="primary"
            variant="flat"
            radius="sm"
            size="md"
            className="w-auto"
            onClick={onPrev}
          >
            უკან
          </Button>
          <Button
            color="primary"
            size="md"
            radius="sm"
            variant="shadow"
            className="w-auto"
            onClick={onContinue}
          >
            შემდეგ
          </Button>
        </>
      );
      break;
    default:
      footerContent = null;
  }

  return (
    <>
      <footer>
        <hr className="my-4 md:my-6 lg:my-8 border-t  border-gray-500 dark:border-gray-700" />
        <div className="flex flex-row items-center justify-center gap-4 lg:gap-24">
          {footerContent}
        </div>
      </footer>
    </>
  );
};

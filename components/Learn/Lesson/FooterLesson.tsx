import React from "react";
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
  onTryAgain: () => void;
  onFinished: () => void;
  answerSelected: boolean;
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
  const [isOpen, setIsOpen] = React.useState(false);

  let footerContent = null;

  switch (contentFooter) {
    case "first":
      footerContent = (
        <Button
          radius="sm"
          size="md"
          variant="shadow"
          color="primary"
          className="w-full md:w-auto"
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
            variant="ghost"
            radius="sm"
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
          {answerSelected ? (
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
              <Button
                color="primary"
                radius="sm"
                size="md"
                variant="shadow"
                className="w-auto"
                onClick={onTryAgain}
              >
                თავიდან ცდა
              </Button>
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
            variant="ghost"
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
          {answerSelected ? (
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
              <Button
                color="primary"
                radius="sm"
                size="md"
                variant="shadow"
                className="w-auto"
                onClick={onTryAgain}
              >
                Try Again
              </Button>
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
            variant="ghost"
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
        <hr className="my-4 md:my-6 lg:my-8 border-t border-gray-500 dark:border-gray-700" />
        <div className="flex flex-row items-center justify-center gap-4  lg:gap-24">
          {footerContent}
        </div>
      </footer>
    </>
  );
};

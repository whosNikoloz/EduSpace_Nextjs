import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

type FooterLessonProps = {
  onPrev: () => void;
  onContinue: () => void;
  contentFooter: string;
  answerSelected: boolean;
  answerSelectedCorrect: boolean;
};

export const FooterLesson: React.FC<FooterLessonProps> = ({
  onPrev,
  onContinue,
  contentFooter,
  answerSelected,
  answerSelectedCorrect,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <footer className="rounded-lg shadow">
        <hr className="my-4 md:my-6 lg:my-8 border-gray-200 dark:border-gray-700" />
        <div className="flex flex-row items-center justify-center gap-4 md:gap-6 lg:gap-9">
          {contentFooter === "first" ? (
            <>
              <Button
                radius="sm"
                variant="shadow"
                color="primary"
                className="w-full md:w-auto"
                onClick={onContinue}
              >
                Continue
              </Button>
            </>
          ) : contentFooter === "test" ? (
            <>
              <Button
                color="primary"
                variant="ghost"
                radius="sm"
                className="w-auto"
                onClick={onPrev}
              >
                Back
              </Button>

              <Popover
                isOpen={isOpen}
                backdrop="opaque"
                onOpenChange={(open) => setIsOpen(open)}
                color="primary"
              >
                <PopoverTrigger>
                  <Button
                    color="primary"
                    variant="shadow"
                    radius="sm"
                    className="w-auto"
                  >
                    Hint
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold text-center">
                      მინიშნება
                    </div>
                    <div className="text-tiny">
                      ბალ ბლა ბლა ბალ ბლა ბლაბალ ბლა ბლა
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {answerSelected ? (
                answerSelectedCorrect ? (
                  <Button
                    color="primary"
                    radius="sm"
                    variant="shadow"
                    className="w-auto"
                    onClick={onContinue}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    radius="sm"
                    variant="shadow"
                    className="w-auto"
                  >
                    Try Again
                  </Button>
                )
              ) : null}
            </>
          ) : contentFooter === "last" ? (
            <>
              <Button
                color="primary"
                variant="ghost"
                radius="sm"
                className="w-auto"
                onClick={onPrev}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="ghost"
                radius="sm"
                className="w-auto"
                isIconOnly
                onClick={onPrev}
              >
                Hint
              </Button>
              {answerSelected ? (
                answerSelectedCorrect ? (
                  <Button
                    color="primary"
                    radius="sm"
                    variant="shadow"
                    className="w-auto"
                    onClick={onContinue}
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    radius="sm"
                    variant="shadow"
                    className="w-auto"
                  >
                    Try Again
                  </Button>
                )
              ) : null}
            </>
          ) : contentFooter == "learn" ? (
            <>
              <Button
                color="primary"
                variant="ghost"
                radius="sm"
                className="w-auto"
                onClick={onPrev}
              >
                Back
              </Button>
              <Button
                color="primary"
                radius="sm"
                variant="ghost"
                className="w-auto"
                onClick={onContinue}
              >
                Continue
              </Button>
            </>
          ) : null}
        </div>
      </footer>
    </>
  );
};

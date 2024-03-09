import React from "react";
import {
  Certification,
  LearnIcon,
  PersonQ,
  Code,
  CsharpOutline,
} from "@/components/icons";
import { StepCard } from "./stepCard";
import {
  FirstContent,
  SecondContent,
  ThirdContent,
  FourthContent,
  FifthContent,
} from "@/components/Home/StepsComponents/stepContent";

const languageData = {
  en: {
    step: [
      {
        id: "1",
        title: "Explore available subjects",
        svg: <LearnIcon />,
        card: FirstContent,
      },
      {
        id: "2",
        title: "Choose a Programming Language",
        svg: <CsharpOutline />,
        card: SecondContent,
      },
      {
        id: "3",
        title: "Begin Your Learning Journey",
        svg: <Code />,
        card: ThirdContent,
      },
      {
        id: "4",
        title: "Join the Q&A and Discussion",
        svg: <PersonQ />,
        card: FourthContent,
      },
      {
        id: "5",
        title: "Get a Certificate",
        svg: <Certification size={70} />,
        card: FifthContent,
      },
    ],
  },
  ka: {
    step: [
      {
        id: "1",
        title: "შეისწავლეთ ხელმისაწვდომი საგნები",
        svg: <LearnIcon />,
        card: FirstContent,
      },
      {
        id: "2",
        title: "აირჩიეთ პროგრამირების ენა",
        svg: <CsharpOutline />,
        card: SecondContent,
      },
      {
        id: "3",
        title: "დაიწყეთ თქვენი სასწავლო მოგზაურობა",
        svg: <Code />,
        card: ThirdContent,
      },
      {
        id: "4",
        title: "ჩაერთეთ კითხვა-პასუხში და დისკუსიაში",
        svg: <PersonQ />,
        card: FourthContent,
      },
      {
        id: "5",
        title: "მიიღე სერთიფიკატი",
        svg: <Certification size={70} />,
        card: FifthContent,
      },
    ],
  },
};

export const StepsNew = ({ lng }) => {
  const languageDataItem = languageData[lng] || languageData["ka"];

  if (!languageDataItem) {
    // Handle the case when both languageData[lng] and languageData["ka"] are undefined
    console.error("Invalid language key");
    return null;
  }

  const { step } = languageDataItem;

  return (
    <>
      <div className="flex w-full items-start gap-20 md:flex-row flex-col">
        <div className="w-full flex md:ml-10  md:gap-56 gap-20 flex-col  py-[50vh]">
          {step.map((step, index) => (
            <StepCard id={step.id} key={index}>
              <div className="flex items-center justify-center lg:col-span-1  col-span-full">
                {step.svg}
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <p
                  className={
                    "font-heading text-xl md:text-4xl lg:text-5xl font-bold transition-colors"
                  }
                >
                  {step.title}
                </p>
              </div>
            </StepCard>
          ))}
        </div>
        <div className="sticky top-0 x mr-3  h-screen w-full items-center hidden md:flex">
          <div className="relative aspect-square w-full h-[400px] bg-transparent">
            {step.map((step, index) => (
              <step.card id={step.id} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

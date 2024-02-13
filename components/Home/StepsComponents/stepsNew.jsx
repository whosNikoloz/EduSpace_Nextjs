import React from "react";
import { Reveal } from "../../RevealFramer";
import { CertificationIcon } from "@/components/Learn/CertificationIcon";
import { LearnIcon, PersonQ, Code, Csharp } from "@/components/Home/stepsIcons";
import { Card, CardBody } from "@nextui-org/react";
import { StepCard } from "./stepCard";
import {
  FirstContent,
  SecondContent,
  ThirdContent,
  FourthContent,
  FifthContent,
} from "@/components/Home/StepsComponents/stepContent";

const StepData = {
  step: [
    {
      id: "1",
      title: "შეისწავლეთ ხელმისაწვდომი საგნები",
      stepOne: "აირჩიეთ თქვენთვის საინტერესო საგანი.",
      stepTwo: "აღმოაჩინეთ პროგრამირების თემების ფართო სპექტრი.",
      stepThree: "წვდომა ვიზუალურად ორგანიზებულ სიაზე ან საგნების ბადეზე.",
      svg: <LearnIcon />,
      card: FirstContent,
    },
    {
      id: "2",
      title: "აირჩიეთ პროგრამირების ენა",
      stepOne: "შეარჩიეთ პროგრამირების ენა თქვენი არჩეული საგნისთვის.",
      stepTwo:
        "დარწმუნდით, რომ თქვენი ენა შეესაბამება თქვენს სასწავლო მიზნებს.",
      stepThree: "გაეცანით პოპულარული ენების აპლიკაციებს.",
      svg: <Csharp />,
      card: SecondContent,
    },
    {
      id: "3",
      title: "დაიწყეთ თქვენი სასწავლო მოგზაურობა",
      stepOne: "დაიწყეთ სწავლა შესავალი კურსებით.",
      stepTwo: "შექმენით მყარი საფუძველი თქვენს არჩეულ თემაზე.",
      stepThree: "აკონტროლეთ თქვენი პროგრესი წინსვლისას.",
      svg: <Code />,
      card: ThirdContent,
    },
    {
      id: "4",
      title: "ჩაერთეთ კითხვა-პასუხში და დისკუსიაში",
      stepOne: "აქტიური მონაწილეობა სასწავლო საზოგადოებაში.",
      stepTwo: "დასვით კითხვები, გაუზიარეთ ცოდნა და მოიძიეთ განმარტებები.",
      stepThree: "ითანამშრომლეთ თანატოლებთან თქვენი გაგების გასაუმჯობესებლად.",
      svg: <PersonQ />,
      card: FourthContent,
    },
    {
      id: "5",
      title: "მიიღე სერთიფიკატი",
      stepOne: "დაასრულეთ კურსები, დავალებები და ვიქტორინები.",
      stepTwo: "აჩვენეთ თქვენი ცოდნა გამოცდების საშუალებით.",
      stepThree: "მიიღეთ ღირებული სერთიფიკატები თქვენი რეზიუმესთვის.",
      svg: <CertificationIcon size={70} />,
      card: FifthContent,
    },
  ],
};

export const StepsNew = () => {
  return (
    <>
      <div className="flex w-full items-start gap-20 md:flex-row flex-col">
        <div className="w-full flex md:ml-10  md:gap-56 gap-20 flex-col  py-[50vh]">
          {StepData.step.map((step, index) => (
            <StepCard id={step.id} key={index}>
              <div className="flex items-center justify-center lg:col-span-1  col-span-full">
                {step.svg}
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <p
                  className={
                    "font-heading text-xl md:text-5xl font-bold transition-colors"
                  }
                >
                  {step.title}
                </p>
              </div>
            </StepCard>
          ))}
        </div>
        <div className="sticky top-0 x mr-3 flex h-screen w-full items-center hidden md:flex">
          <div className="relative aspect-square w-full h-[400px] bg-transparent">
            {StepData.step.map((step, index) => (
              <step.card id={step.id} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

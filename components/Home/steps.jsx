import React from "react";
import { Reveal } from "../RevealFramer";
import { CertificationIcon } from "@/components/Learn/CertificationIcon";
import { LearnIcon, PersonQ, Code, Csharp } from "@/components/Home/stepsIcons";
import { Card, CardBody } from "@nextui-org/react";

const StepData = {
  step: [
    {
      title: "შეისწავლეთ ხელმისაწვდომი საგნები",
      stepOne: "აირჩიეთ თქვენთვის საინტერესო საგანი.",
      stepTwo: "აღმოაჩინეთ პროგრამირების თემების ფართო სპექტრი.",
      stepThree: "წვდომა ვიზუალურად ორგანიზებულ სიაზე ან საგნების ბადეზე.",
      svg: <LearnIcon />,
    },
    {
      title: "აირჩიეთ პროგრამირების ენა",
      stepOne: "შეარჩიეთ პროგრამირების ენა თქვენი არჩეული საგნისთვის.",
      stepTwo:
        "დარწმუნდით, რომ თქვენი ენა შეესაბამება თქვენს სასწავლო მიზნებს.",
      stepThree: "გაეცანით პოპულარული ენების აპლიკაციებს.",
      svg: <PersonQ />,
    },
    {
      title: "დაიწყეთ თქვენი სასწავლო მოგზაურობა",
      stepOne: "დაიწყეთ სწავლა შესავალი კურსებით.",
      stepTwo: "შექმენით მყარი საფუძველი თქვენს არჩეულ თემაზე.",
      stepThree: "აკონტროლეთ თქვენი პროგრესი წინსვლისას.",
      svg: <Code />,
    },
    {
      title: "ჩაერთეთ კითხვა-პასუხში და დისკუსიაში",
      stepOne: "აქტიური მონაწილეობა სასწავლო საზოგადოებაში.",
      stepTwo: "დასვით კითხვები, გაუზიარეთ ცოდნა და მოიძიეთ განმარტებები.",
      stepThree: "ითანამშრომლეთ თანატოლებთან თქვენი გაგების გასაუმჯობესებლად.",
      svg: <Csharp />,
    },
    {
      title: "მიიღეთ სერთიფიკატები",
      stepOne: "დაასრულეთ კურსები, დავალებები და ვიქტორინები.",
      stepTwo: "აჩვენეთ თქვენი ცოდნა გამოცდების საშუალებით.",
      stepThree: "მიიღეთ ღირებული სერთიფიკატები თქვენი რეზიუმესთვის.",
      svg: <CertificationIcon size={70} />,
    },
  ],
};

export const Steps = () => {
  return (
    <section>
      <div className="container mx-auto flex flex-col p-4 gap-2">
        {StepData.step.map((step, index) => (
          <Reveal
            direction={index % 2 === 1 ? "right" : "left"}
            key={index}
            delay={index * 0.1}
          >
            <Card className="" isBlurred shadow="lg">
              <CardBody>
                <div className="grid justify-center  grid-cols-4 p-8 space-y-8 lg:space-y-0 steps">
                  <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                    {step.svg}
                  </div>
                  <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                    <span className="text-xs  uppercase dark:text-blue-400">
                      Step {index} &rarr;
                    </span>
                    <span className="text-xl font-bold md:text-2xl">
                      {step.title}
                    </span>
                    <ul className="mt-4 dark:text-gray-300 text-left">
                      <li>• {step.stepOne}</li>
                      <li>• {step.stepTwo}</li>
                      <li>• {step.stepThree}</li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

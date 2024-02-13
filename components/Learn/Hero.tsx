import React from "react";
import { Card, CardBody, Image, Button } from "@nextui-org/react";

interface HeroProps {
  logo: string;
  courseName: string;
  description: string; // Correct the property name to match the interface
}

export const Hero: React.FC<HeroProps> = ({
  logo,
  courseName,
  description,
}) => {
  return (
    <>
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src={logo}
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h1 className="font-semibold text-foreground/90">
                    {courseName}
                  </h1>
                  <h3 className="text-sm font-medium mt-2">{description}</h3>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                <div className="flex justify-between">
                  <p className="text-small text-foreground/50">
                    ხანგძლივობა : 1 თვე
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

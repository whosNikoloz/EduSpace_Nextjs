import React, { FC } from "react";
import { Button } from "@nextui-org/react";
import EnrolledCarusel from "./enrolledCarusel";
import { Reveal } from "../RevealFramer";
import { Card, CardBody, Avatar } from "@nextui-org/react";

export const UserProgress = () => {
  return (
    <>
      <div className="col-span-4 sm:col-span-9 ">
        <Reveal direction="up">
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-black-100/50  justify-center items-center "
            shadow="sm"
          >
            <CardBody>
              <div className=" rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Latest Courses</h2>
                <EnrolledCarusel />

                <h2 className="text-xl font-bold mt-6 mb-4">
                  Latest Certificates
                </h2>
                <div className="mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-600 mr-2">at ABC Company</span>
                      <span className="text-gray-600">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>

                <h2 className="text-xl font-bold mt-6 mb-4">Streaks</h2>
                <div className="mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-600 mr-2">at ABC Company</span>
                      <span className="text-gray-600">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>

                <h2 className="text-xl font-bold mt-6 mb-4">Latest Badges </h2>
                <div className="mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-600 mr-2">at ABC Company</span>
                      <span className="text-gray-600">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Reveal>
      </div>
    </>
  );
};

import React, { FC } from "react";
import { Button, Avatar } from "@nextui-org/react";
import EnrolledCarusel from "./enrolledCarusel";
import { Reveal } from "../RevealFramer";

export const UserProgress = () => {
  return (
    <>
      <div className="col-span-4 sm:col-span-9 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
        <Reveal direction="up">
          <div className=" bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[#1f1e1e] dark:shadow-black/20  backdrop-blur-[30px]shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Latest Courses</h2>
            <EnrolledCarusel />

            <h2 className="text-xl font-bold mt-6 mb-4">Latest Certificates</h2>
            <div className="mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 font-bold">Web Developer</span>
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
                <span className="text-gray-600 font-bold">Web Developer</span>
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
                <span className="text-gray-600 font-bold">Web Developer</span>
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
        </Reveal>
      </div>
    </>
  );
};

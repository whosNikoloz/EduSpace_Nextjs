"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "@nextui-org/react";
import { Reveal } from "../RevealFramer";

const Review = () => {
  return (
    <>
      <div className=" flex items-center justify-center ">
        <div className="w-full shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]   backdrop-blur-[30px]     px-5 py-16 md:py-24 dark:text-white text-black">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-5 dark:text-white text-black">
                What people <br />
                are saying.
              </h1>
              <h3 className="text-xl mb-5 font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h3>
              <div className="text-center mb-10">
                <span className="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-40 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-3 h-1 rounded-full bg-blue-600 ml-1"></span>
                <span className="inline-block w-1 h-1 rounded-full bg-blue-600 ml-1"></span>
              </div>
            </div>
            <Reveal direction="left">
              <div className="-mx-3 md:flex items-start">
                <div className="px-3 md:w-1/3">
                  <div className="w-full mx-auto rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]  p-5 text-gray-800  font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=1" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600 dark:text-white">
                          Kenzie Edgar.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight text-black dark:text-white">
                        &ldquo; EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი!
                        ნაბიჯ-ნაბიჯ გაკვეთილები და ინტერაქტიული სავარჯიშოები
                        დამეხმარა პროგრამირების კონცეფციების სწრაფად გააზრებაში.
                        გმადლობთ, EduSpace, რომ გადამაქციე კოდირების
                        ენთუზიასტად! &rdquo;
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-3 md:w-1/3">
                  <div className="w-full mx-auto rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]   p-5 text-gray-800  font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10   ">
                        <img src="https://i.pravatar.cc/100?img=3" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600 dark:text-white">
                          Tommie Ewart.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight text-black dark:text-white">
                        &ldquo; EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი!
                        ნაბიჯ-ნაბიჯ გაკვეთილები და ინტერაქტიული სავარჯიშოები
                        დამეხმარა პროგრამირების კონცეფციების სწრაფად გააზრებაში.
                        გმადლობთ, EduSpace, რომ გადამაქციე კოდირების
                        ენთუზიასტად! &rdquo;
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-3 md:w-1/3">
                  <div className="w-full mx-auto rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px] p-5 text-gray-800  font-light mb-6">
                    <div className="w-full flex mb-4 items-center">
                      <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                        <img src="https://i.pravatar.cc/100?img=5" alt="" />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-bold text-sm uppercase text-gray-600 dark:text-white">
                          Nevada Herbertson.
                        </h6>
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm leading-tight text-black dark:text-white">
                        &ldquo; EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი!
                        ნაბიჯ-ნაბიჯ გაკვეთილები და ინტერაქტიული სავარჯიშოები
                        დამეხმარა პროგრამირების კონცეფციების სწრაფად გააზრებაში.
                        გმადლობთ, EduSpace, რომ გადამაქციე კოდირების
                        ენთუზიასტად! &rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;

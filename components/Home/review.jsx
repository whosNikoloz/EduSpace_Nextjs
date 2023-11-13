"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image } from "@nextui-org/react";
import { Reveal } from "../RevealFramer";

const Review = () => {
  return (
    <>
      <div className="flex flex-wrap gap-6">
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white review1">
          <Reveal direction="right">
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div>
                  <Image
                    src="https://tailone.tailwindtemplate.net/src/img/dummy/avatar1.png"
                    alt=""
                    width={500}
                    height={300}
                    className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold">CodingNewbie123</h4>
                  <span className="text-xs dark:text-gray-400">2 დღის წინ</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">3.5</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm dark:text-white">
              <p>
                EduSpace-მა აგრძნობინა კოდირება, როგორც ნიავი! ნაბიჯ-ნაბიჯ
                გაკვეთილები და ინტერაქტიული სავარჯიშოები დამეხმარა პროგრამირების
                კონცეფციების სწრაფად გააზრებაში. გმადლობთ, EduSpace, რომ
                გადამაქციე კოდირების ენთუზიასტად!
              </p>
            </div>
          </Reveal>
        </div>
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md  divide-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white review2">
          <Reveal direction="left">
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div>
                  <Image
                    src="https://tailone.tailwindtemplate.net/src/img/dummy/avatar2.png"
                    alt=""
                    width={500}
                    height={300}
                    className="object-cover w-12 h-12 rounded-full dark:bg-black"
                  />
                </div>
                <div>
                  <h4 className="font-bold">DevPro2023</h4>
                  <span className="text-xs dark:text-gray-400">
                    1 კვირის წინ
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">5</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm dark:text-white">
              <p>
                EduSpace არის ჩემი გამოსაყენებელი აპლიკაცია პროგრამირების
                უნარების შესწავლისა და დახვეწისთვის. გათამაშებული სწავლის
                მიდგომა მაძლევს მოტივაციას და საზოგადოების მხარდაჭერა
                ფანტასტიკურია. რეკომენდირებულია დამწყებ კოდირებისთვის
              </p>
            </div>
          </Reveal>
        </div>
        <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md  divide-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white review1">
          <Reveal direction="up">
            <div className="flex justify-between p-4">
              <div className="flex space-x-4">
                <div>
                  <Image
                    src="https://tailone.tailwindtemplate.net/src/img/dummy/avatar3.png"
                    alt=""
                    width={500}
                    height={300}
                    className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold">CodingNinja99</h4>
                  <span className="text-xs dark:text-gray-400">1 თვის წინ</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 dark:text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
                </svg>
                <span className="text-xl font-bold">4.5</span>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm dark:text-white">
              <p>
                EduSpace არის ნამდვილი ძვირფასი ქვა, როგორც დამწყებთათვის, ასევე
                ექსპერტებისთვის. პერსონალიზებული სასწავლო გზა და მენტორებთან
                წვდომა ფასდაუდებელია. მე გავიზარდე როგორც პროგრამისტი ამ
                აპლიკაციის წყალობით.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Review;

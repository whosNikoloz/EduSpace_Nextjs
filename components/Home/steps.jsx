import React from "react";
import { Reveal } from "../RevealFramer";
import { CertificationIcon } from "@/components/Learn/CertificationIcon";

export const Steps = () => {
  return (
    <section className="shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]   ">
      <div className="container mx-auto flex flex-col p-4">
        <div className="divide-y divide-gray-700">
          <Reveal direction="left">
            <div className="grid justify-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px] grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0 steps">
              <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  version="1.1"
                  className="w-16 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M513.147 584.708c-15.947 0-39.468-1.747-61.040-10.031l-172.596-66.501h-84.542v103.565c0 31.84 23.684 67.975 52.884 80.663l208.987 90.967c29.2 12.688 76.605 12.743 105.841 0.127l211.263-91.222c29.218-12.615 52.921-48.697 52.921-80.537v-103.565h-93.298l-152.954 64.48c-18.386 7.773-42.38 12.051-67.466 12.051zM46.313 372.991l416.19 160.363c29.728 11.433 77.605 10.686 106.951-1.693l397.458-167.536v247.18l-24.558 81.938h71.015l-25.413-82.794v-256.319h-0.71c17.167-11.833 13.162-26.596-12.252-35.681l-404.357-143.888c-30.001-10.704-78.479-10.25-108.299 0.946l-415.844 156.449c-29.819 11.214-29.891 29.6-0.182 41.033z"></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <span className="text-xs  uppercase dark:text-blue-400">
                  Step 1 &rarr;
                </span>
                <span className="text-xl font-bold md:text-2xl">
                  შეისწავლეთ ხელმისაწვდომი საგნები
                </span>
                <ul className="mt-4 dark:text-gray-300 text-left">
                  <li>• აირჩიეთ თქვენთვის საინტერესო საგანი.</li>
                  <li>• აღმოაჩინეთ პროგრამირების თემების ფართო სპექტრი.</li>
                  <li>
                    • წვდომა ვიზუალურად ორგანიზებულ სიაზე ან საგნების ბადეზე.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="grid justify-center  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]  grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0 steps">
              <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-16 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fillRule="nonzero"
                      clipRule="nonzero"
                      d="M7.00017 5.5C5.61936 5.5 4.5 6.61936 4.5 8.00017C4.5 9.38097 5.61936 10.5003 7.00017 10.5003C7.71226 10.5003 8.3538 10.2036 8.81009 9.725C9.09591 9.4252 9.57065 9.41386 9.87045 9.69968C10.1703 9.9855 10.1816 10.4602 9.89577 10.76C9.16817 11.5232 8.13926 12.0003 7.00017 12.0003C4.79094 12.0003 3 10.2094 3 8.00017C3 5.79094 4.79094 4 7.00017 4C8.13445 4 9.15952 4.47309 9.88658 5.23069C10.1734 5.52954 10.1636 6.00432 9.86477 6.29112C9.56591 6.57793 9.09114 6.56817 8.80433 6.26931C8.3484 5.79424 7.70928 5.5 7.00017 5.5Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      fillRule="nonzero"
                      clipRule="nonzero"
                      d="M6.58638 0.102166C6.8199 -0.0340553 7.10867 -0.0340553 7.34219 0.102166L12.0565 2.85217C12.4143 3.06088 12.5351 3.52011 12.3264 3.8779C12.1177 4.23569 11.6585 4.35654 11.3007 4.14783L6.96429 1.61828L1.5 4.80578V11.1942L6.96429 14.3817L11.3007 11.8522C11.6585 11.6435 12.1177 11.7643 12.3264 12.1221C12.5351 12.4799 12.4143 12.9391 12.0565 13.1478L7.34219 15.8978C7.10867 16.0341 6.8199 16.0341 6.58638 15.8978L0.372097 12.2728C0.141683 12.1384 0 11.8918 0 11.625V4.375C0 4.10825 0.141683 3.86157 0.372097 3.72717L6.58638 0.102166Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      fillRule="nonzero"
                      clipRule="nonzero"
                      d="M12.1799 5.25C12.456 5.25 12.6799 5.47386 12.6799 5.75V10.25C12.6799 10.5261 12.456 10.75 12.1799 10.75C11.9038 10.75 11.6799 10.5261 11.6799 10.25V5.75C11.6799 5.47386 11.9038 5.25 12.1799 5.25Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      fillRule="nonzero"
                      clipRule="nonzero"
                      d="M14.3201 5.25C14.5962 5.25 14.8201 5.47386 14.8201 5.75V10.25C14.8201 10.5261 14.5962 10.75 14.3201 10.75C14.044 10.75 13.8201 10.5261 13.8201 10.25V5.75C13.8201 5.47386 14.044 5.25 14.3201 5.25Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      fillRule="nonzero"
                      clipRule="nonzero"
                      d="M10.5 6.92993C10.5 6.65379 10.7239 6.42993 11 6.42993H15.5C15.7761 6.42993 16 6.65379 16 6.92993C16 7.20607 15.7761 7.42993 15.5 7.42993H11C10.7239 7.42993 10.5 7.20607 10.5 6.92993Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      fillRule="nonzero"
                      clipRule="nonzero"
                      d="M10.5 9.07007C10.5 8.79393 10.7239 8.57007 11 8.57007H15.5C15.7761 8.57007 16 8.79393 16 9.07007C16 9.34621 15.7761 9.57007 15.5 9.57007H11C10.7239 9.57007 10.5 9.34621 10.5 9.07007Z"
                      fill="currentColor"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <span className="text-xs tracki uppercase dark:text-blue-400">
                  Step 2 &rarr;
                </span>
                <span className="text-xl font-bold md:text-2xl">
                  აირჩიეთ პროგრამირების ენა
                </span>
                <ul className="mt-4 dark:text-gray-300 text-left">
                  <li>
                    • შეარჩიეთ პროგრამირების ენა თქვენი არჩეული საგნისთვის.
                  </li>
                  <li>
                    • დარწმუნდით, რომ თქვენი ენა შეესაბამება თქვენს სასწავლო
                    მიზნებს.
                  </li>
                  <li>• გაეცანით პოპულარული ენების აპლიკაციებს.</li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="grid justify-center  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]  grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0 steps">
              <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-16 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M14.9615 5.27473C15.1132 4.7437 14.8058 4.19021 14.2747 4.03849C13.7437 3.88677 13.1902 4.19426 13.0385 4.72529L9.03847 18.7253C8.88675 19.2563 9.19424 19.8098 9.72528 19.9615C10.2563 20.1133 10.8098 19.8058 10.9615 19.2747L14.9615 5.27473Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      d="M5.7991 7.39879C6.13114 7.84012 6.04255 8.46705 5.60123 8.7991L2.40894 11.2009C1.87724 11.601 1.87723 12.399 2.40894 12.7991L5.60123 15.2009C6.04255 15.533 6.13114 16.1599 5.7991 16.6012C5.46705 17.0426 4.84012 17.1311 4.39879 16.7991L1.20651 14.3973C-0.388615 13.1971 -0.388621 10.8029 1.2065 9.60276L4.39879 7.20093C4.84012 6.86889 5.46705 6.95747 5.7991 7.39879Z"
                      fill="currentColor"
                    ></path>{" "}
                    <path
                      d="M18.2009 16.6012C17.8689 16.1599 17.9575 15.533 18.3988 15.2009L21.5911 12.7991C22.1228 12.399 22.1228 11.601 21.5911 11.2009L18.3988 8.7991C17.9575 8.46705 17.8689 7.84012 18.2009 7.39879C18.533 6.95747 19.1599 6.86889 19.6012 7.20093L22.7935 9.60276C24.3886 10.8029 24.3886 13.1971 22.7935 14.3973L19.6012 16.7991C19.1599 17.1311 18.533 17.0426 18.2009 16.6012Z"
                      fill="currentColor"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <span className="text-xs tracki uppercase dark:text-blue-400">
                  Step 3 &rarr;
                </span>
                <span className="text-xl font-bold md:text-2xl">
                  დაიწყეთ თქვენი სასწავლო მოგზაურობა
                </span>
                <ul className="mt-4 dark:text-gray-300 text-left">
                  <li>• დაიწყეთ სწავლა შესავალი კურსებით.</li>
                  <li>• შექმენით მყარი საფუძველი თქვენს არჩეულ თემაზე.</li>
                  <li>• აკონტროლეთ თქვენი პროგრესი წინსვლისას.</li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="grid justify-center  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]  grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0 steps">
              <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-16 h-16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M4 21V19.5C4 16.4624 6.46243 14 9.5 14H12.5C15.5376 14 18 16.4624 18 19.5V21M7 21V18M15 21V18M16.5 6L16.8367 5.49493C17.1969 4.95461 17.9371 4.82782 18.4566 5.21745C19.0073 5.63047 19.0645 6.43549 18.5778 6.92224L17.8536 7.64645C17.6272 7.87282 17.5 8.17986 17.5 8.5M17.5 10V10.2M13.8281 4.89801C14.6435 3.74945 15.9842 3 17.5 3C19.9853 3 22 5.01472 22 7.5C22 9.98528 19.9853 12 17.5 12C16.2549 12 15.1279 11.4943 14.3131 10.6771M15 8.00001C15 5.79086 13.2091 4 11 4C8.79086 4 7 5.79086 7 8.00001C7 10.2092 8.79086 12 11 12C11.8312 12 12.6032 11.7465 13.2429 11.3125C14.3033 10.5931 15 9.37794 15 8.00001Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.4"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <span className="text-xs tracki uppercase dark:text-blue-400">
                  Step 4 &rarr;
                </span>
                <span className="text-xl font-bold md:text-2xl">
                  ჩაერთეთ კითხვა-პასუხში და დისკუსიაში
                </span>
                <ul className="mt-4 dark:text-gray-300 text-left">
                  <li>• აქტიური მონაწილეობა სასწავლო საზოგადოებაში.</li>
                  <li>
                    • დასვით კითხვები, გაუზიარეთ ცოდნა და მოიძიეთ განმარტებები.
                  </li>
                  <li>
                    • ითანამშრომლეთ თანატოლებთან თქვენი გაგების
                    გასაუმჯობესებლად.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <div className="grid justify-center  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  backdrop-blur-[30px]  grid-cols-4 p-8 mx-auto space-y-8 lg:space-y-0 steps">
              <div className="flex items-center justify-center lg:col-span-1 col-span-full">
                <CertificationIcon size={60} />
              </div>
              <div className="flex flex-col justify-center max-w-3xl text-center col-span-full lg:col-span-3 lg:text-left">
                <span className="text-xs tracki uppercase dark:text-blue-400">
                  Step 5 &rarr;
                </span>
                <span className="text-xl font-bold md:text-2xl">
                  მიიღეთ სერთიფიკატები
                </span>
                <ul className="mt-4 dark:text-gray-300 text-left">
                  <li>• დაასრულეთ კურსები, დავალებები და ვიქტორინები.</li>
                  <li>• აჩვენეთ თქვენი ცოდნა გამოცდების საშუალებით.</li>
                  <li>• მიიღეთ ღირებული სერთიფიკატები თქვენი რეზიუმესთვის.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

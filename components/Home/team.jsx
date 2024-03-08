"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { Reveal } from "../RevealFramer";
import { Card, CardHeader } from "@nextui-org/react";
import TypingEffect from "@/components/typedtext";

export default function Team({ lng }) {
  const [selectedCategory, setSelectedCategory] = useState("mobile");
  const [inputValue, setInputValue] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.id);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const peopleData = {
    mobile: [
      {
        name: "Nikoloz  Kobaidze1",
        role: "IOS Frontend Developer",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
      {
        name: "Nikoloz  Kobaidze2",
        role: "IOS Backend Developer",
        image:
          "https://firebasestorage.googleapis.com/v0/b/eduspace-a81b5.appspot.com/o/UserProfiles%2F1709757310950-aqj9p53e5a8-profilePic.jpg?alt=media&token=9d52da4d-3141-4ed8-a8c3-17388be047bb",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
      {
        name: "Nikoloz  Kobaidze3",
        role: "UI/UX Mobile Designer",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
    ],
    web: [
      {
        name: "Nikoloz  Kobaidze4",
        role: "Full Stack Web Developer",
        image:
          "https://firebasestorage.googleapis.com/v0/b/eduspace-a81b5.appspot.com/o/UserProfiles%2F1709757310950-aqj9p53e5a8-profilePic.jpg?alt=media&token=9d52da4d-3141-4ed8-a8c3-17388be047bb",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
      {
        name: "Nikoloz  Kobaidze5",
        role: "Backend Developer",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
      {
        name: "Nikoloz  Kobaidze6",
        role: "Frontend Developer",
        image:
          "https://firebasestorage.googleapis.com/v0/b/eduspace-a81b5.appspot.com/o/UserProfiles%2F1709757310950-aqj9p53e5a8-profilePic.jpg?alt=media&token=9d52da4d-3141-4ed8-a8c3-17388be047bb",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
    ],
    ai: [
      {
        name: "Nikoloz  Kobaidze7",
        role: "AI",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
      {
        name: "Nikoloz  Kobaidze8",
        role: "AI",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
      {
        name: "Nikoloz  Kobaidze9",
        role: "AI",
        image:
          "https://nikolozkobaidze.vercel.app/_next/image?url=%2Fimg%2FNikoloz1.JPG&w=640&q=75",
        facebook: "https://www.facebook.com/profile.php?id=100009152091053",
        in: "https://www.linkedin.com/in/nikoloz-kobaidze-298a35254/",
        github: "https://github.com/whosNikoloz",
      },
    ],
  };

  const languageData = {
    en: {
      paragraph:
        "Meet our certified and qualified team members,  Both active and inactive, dedicated to your study To facilitate the journey in programming.",
    },
    ka: {
      paragraph:
        "გაიცანით ჩვენი სერტიფიცირებული და კვალიფიციური გუნდის წევრები,როგორც აქტიური, ასევე არააქტიური, მიძღვნილი თქვენი სასწავლო მოგზაურობის გასაადვილებლად პროგრამირებაში.",
    },
  };

  const { paragraph } = languageData[lng ? lng : "ge"];

  return (
    <>
      <section className="">
        <div className="container px-6 py-10 mx-auto text-center">
          <p className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Out Team
          </p>

          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
            {paragraph}
          </p>
          <div className="flex items-center justify-center ">
            <div className="flex items-center p-1 border border-blue-600  dark:border-blue-400 rounded-xl gap-2">
              <input
                type="radio"
                id="mobile"
                name="category"
                className="hidden "
                checked={selectedCategory === "mobile"}
                onChange={handleCategoryChange}
              />
              <label
                htmlFor="mobile"
                className={`px-4 py-2 text-sm font-medium capitalize ${
                  selectedCategory === "mobile"
                    ? "text-white bg-blue-600 hover:bg-blue-600"
                    : "text-blue-600 dark:text-blue-400 dark:hover:text-white hover:bg-blue-600 hover:text-white"
                } rounded-xl md:py-3 md:px-12 cursor-pointer`}
              >
                Mobile Dev
              </label>

              <input
                type="radio"
                id="web"
                name="category"
                className="hidden"
                checked={selectedCategory === "web"}
                onChange={handleCategoryChange}
              />
              <label
                htmlFor="web"
                className={`px-6 py-2 text-sm font-medium capitalize ${
                  selectedCategory === "web"
                    ? "text-white bg-blue-600 hover:bg-blue-600"
                    : "text-blue-600 dark:text-blue-400 dark:hover:text-white hover:bg-blue-600 hover:text-white"
                } rounded-xl md:py-3 md:px-12 cursor-pointer`}
              >
                Web Dev
              </label>

              <input
                type="radio"
                id="ai"
                name="category"
                className="hidden"
                checked={selectedCategory === "ai"}
                onChange={handleCategoryChange}
              />
              <label
                htmlFor="ai"
                className={`px-6 py-2 text-sm font-medium capitalize ${
                  selectedCategory === "ai"
                    ? "text-white bg-blue-600 hover:bg-blue-600"
                    : "text-blue-600 dark:text-blue-400 dark:hover:text-white hover:bg-blue-600 hover:text-white"
                } rounded-xl md:py-3 md:px-12 cursor-pointer`}
              >
                Ai Dev
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {peopleData[selectedCategory].map((person, index) => (
              <Reveal
                key={`${selectedCategory}-${inputValue}-${index}`}
                direction="scale"
                delay={index * 0.2}
              >
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                  <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      {person.role}
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {person.name}
                    </h4>
                    <div className="flex mt-3 -mx-2">
                      <Link
                        href={person.in}
                        target="_blank"
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        aria-label="linkedin"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-6 h-6 fill-current"
                          width="1rem"
                          height="1rem"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"
                          ></path>
                        </svg>
                      </Link>

                      <Link
                        href={person.facebook}
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        aria-label="Facebook"
                        target="_blank"
                      >
                        <i className="fab fa-facebook text-facebook"></i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-6 h-6 fill-current"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
                          ></path>
                        </svg>
                      </Link>

                      <Link
                        href={person.github}
                        className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                        aria-label="Github"
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-block w-6 h-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                        </svg>
                      </Link>
                    </div>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Card background"
                    className="z-0 w-full h-full object-cover"
                    src={person.image}
                  />
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

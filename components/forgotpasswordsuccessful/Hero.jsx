import Ilustration from "@/public/ProgiLust3.png";
import Image from "next/image";
import { Reveal } from "../RevealFramer";
import Link from "next/link";

export const Hero = ({ userEmail }) => {
  return (
    <>
      <div className="flex flex-wrap md:mt-36">
        {/* Image for small screens */}
        <div className="w-full md:hidden">
          <div className="mx-auto flex items-center justify-center ">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>

        {/* Title and content for medium screens and above */}
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center">
            <Reveal direction="up">
              <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
                Great Work, <span className="text-blue-600">!</span>
              </h1>
            </Reveal>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              ელფოსტა გაიგზავნა {userEmail} ანგარიშზე პაროლის აღსადგენად.
              გთხოვთ, შეამოწმოთ თქვენი ელფოსტა და დააჭიროთ დამადასტურებელ ბმულზე
              პაროლის აღსადგენად.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://mail.google.com/"
                className="bg-blue-600 text-white inline-block py-2 px-4 rounded"
              >
                აღდგენა
              </Link>
              <p
                href="#"
                className="text-sm font-semibold leading-6 text-black dark:text-white"
              >
                ბმულის თაივდან გაგზვნა <span aria-hidden="true">→</span>
              </p>
            </div>
          </div>
        </div>
        {/* Image for medium screens and above */}
        <div className="hidden md:block w-1/2">
          <div className="mx-auto flex items-center justify-center bounce-img">
            <Image src={Ilustration} alt="error" />
          </div>
        </div>
      </div>
    </>
  );
};
